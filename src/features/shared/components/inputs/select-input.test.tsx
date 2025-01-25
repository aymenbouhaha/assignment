import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SelectInput } from "@shared/components/inputs/select-input.tsx";

describe("SelectInput", () => {
	const mockValues = [
		{ placeholder: "Option 1", value: "value1" },
		{ placeholder: "Option 2", value: "value2" },
	];
	const mockOnValueChange = vi.fn();

	it("renders correctly with placeholder and no selected value", () => {
		const { asFragment } = render(
			<SelectInput placeholder="Select an option" values={mockValues} onValueChange={mockOnValueChange} />,
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("renders correctly with a selected value", () => {
		const { getByText, asFragment } = render(
			<SelectInput placeholder="Select an option" values={mockValues} onValueChange={mockOnValueChange} />,
		);

		fireEvent.click(getByText("Select an option"));
		fireEvent.click(getByText("Option 1"));

		expect(mockOnValueChange).toHaveBeenCalledWith("value1");
		expect(asFragment()).toMatchSnapshot();
	});

	it("renders correctly with the clear icon when a value is selected", () => {
		const { getByText, container, asFragment } = render(
			<SelectInput placeholder="Select an option" values={mockValues} onValueChange={mockOnValueChange} />,
		);

		fireEvent.click(getByText("Select an option"));
		fireEvent.click(getByText("Option 2"));

		const clearIcon = container.querySelector(".size-6.cursor-pointer");
		expect(clearIcon).toBeTruthy();

		fireEvent.click(clearIcon!);
		expect(mockOnValueChange).toHaveBeenCalledWith("");

		expect(asFragment()).toMatchSnapshot();
	});
});
