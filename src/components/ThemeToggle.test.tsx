import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
	it("começa em auto quando não há preferência salva", () => {
		render(<ThemeToggle />);

		expect(screen.getByRole("button")).toHaveTextContent("Auto");
		expect(document.documentElement).not.toHaveAttribute("data-theme");
	});

	it("cicla auto → light → dark → auto ao clicar", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		await user.click(button);
		expect(button).toHaveTextContent("Light");

		await user.click(button);
		expect(button).toHaveTextContent("Dark");

		await user.click(button);
		expect(button).toHaveTextContent("Auto");
	});

	it("persiste o modo escolhido no localStorage", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);

		await user.click(screen.getByRole("button"));

		expect(window.localStorage.getItem("theme")).toBe("light");
	});

	it("restaura o modo salvo e aplica a classe no documento", () => {
		window.localStorage.setItem("theme", "dark");

		render(<ThemeToggle />);

		expect(screen.getByRole("button")).toHaveTextContent("Dark");
		expect(document.documentElement).toHaveClass("dark");
		expect(document.documentElement).toHaveAttribute("data-theme", "dark");
	});

	it("expõe um rótulo acessível descrevendo o próximo estado", () => {
		render(<ThemeToggle />);

		expect(
			screen.getByRole("button", { name: /auto \(system\)/i }),
		).toBeInTheDocument();
	});
});
