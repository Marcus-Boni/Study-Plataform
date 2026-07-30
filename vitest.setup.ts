import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// jsdom não implementa matchMedia, e qualquer componente que reaja a
// prefers-color-scheme quebra sem esse stub.
beforeEach(() => {
	vi.stubGlobal(
		"matchMedia",
		vi.fn((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	);
});

// Testing Library não desmonta sozinha quando `globals: true`.
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
	window.localStorage.clear();
	document.documentElement.className = "";
	document.documentElement.removeAttribute("data-theme");
});
