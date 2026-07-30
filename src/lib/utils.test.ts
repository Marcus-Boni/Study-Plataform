import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("resolve conflito de classes do Tailwind mantendo a última", () => {
		expect(cn("px-2", "px-4")).toBe("px-4");
	});

	it("ignora valores falsy vindos de condicionais", () => {
		expect(cn("flex", false && "hidden", undefined, "gap-2")).toBe(
			"flex gap-2",
		);
	});

	it("aceita arrays e objetos como o clsx", () => {
		expect(cn(["flex"], { hidden: false, "gap-2": true })).toBe("flex gap-2");
	});
});
