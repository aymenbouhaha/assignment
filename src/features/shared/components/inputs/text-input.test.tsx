import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { vi } from "vitest";
import { TextInput } from "@shared/components/inputs/text-input.tsx";

describe("TextInput", () => {
	it("matches the snapshot", () => {
		const { container } = render(<TextInput placeholder="Enter text" />);
		expect(container).toMatchSnapshot();
	});

	it("renders lead icon when provided", () => {
		const { container } = render(<TextInput placeholder="Enter text" leadIcon={{ icon: "Search" }} />);
		expect(container).toMatchSnapshot();
	});

	it("calls onValueChange when input value changes", () => {
		const mockOnValueChange = vi.fn();
		const { getByPlaceholderText } = render(<TextInput placeholder="Enter text" onValueChange={mockOnValueChange} />);

		const input = getByPlaceholderText("Enter text");
		fireEvent.change(input, { target: { value: "Hello" } });

		expect(mockOnValueChange).toHaveBeenCalledWith("Hello");
	});

	it("clears the input value when close icon is clicked", () => {
		const { getByPlaceholderText, container } = render(<TextInput placeholder="Enter text" />);

		const input = getByPlaceholderText("Enter text");
		fireEvent.change(input, { target: { value: "Hello" } });

		expect(input).toHaveValue("Hello");

		const closeIcon = container.querySelector(".cursor-pointer");
		fireEvent.click(closeIcon!);

		expect(input).toHaveValue("");
	});
});
