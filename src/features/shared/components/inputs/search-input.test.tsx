import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchInput } from "./search-input";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetDropdownItems = vi.fn();
const mockOnItemSelected = vi.fn();
const mockToast = vi.fn();

vi.mock("@shared/hooks/use-toast.ts", () => ({
	useToast: () => ({ toast: mockToast }),
}));

describe("SearchInput", () => {
	beforeEach(() => {
		mockGetDropdownItems.mockClear();
		mockOnItemSelected.mockClear();
	});

	it("renders input with placeholder", () => {
		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
			/>,
		);

		expect(screen.getByPlaceholderText("Search for items")).toBeInTheDocument();
	});

	it("triggers search on input change and fetches items", async () => {
		mockGetDropdownItems.mockResolvedValue({
			items: [{ value: "1", placeholder: "Item 1" }],
			cursor: { hasNextPage: false, endCursor: null },
		});

		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
			/>,
		);

		const input = screen.getByPlaceholderText("Search for items");
		fireEvent.change(input, { target: { value: "Item" } });

		await waitFor(() => expect(mockGetDropdownItems).toHaveBeenCalledWith({ after: null, search: "Item" }));
		expect(screen.getByText("Item 1")).toBeInTheDocument();
	});

	it("displays 'No items found' when no results are returned", async () => {
		mockGetDropdownItems.mockResolvedValue({
			items: [],
			cursor: { hasNextPage: false, endCursor: null },
		});

		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
			/>,
		);

		const input = screen.getByPlaceholderText("Search for items");
		fireEvent.change(input, { target: { value: "Nonexistent" } });

		await waitFor(() => expect(mockGetDropdownItems).toHaveBeenCalledWith({ after: null, search: "Nonexistent" }));
		expect(screen.getByText("No items found")).toBeInTheDocument();
	});

	it("calls onItemSelected when an item is clicked", async () => {
		mockGetDropdownItems.mockResolvedValue({
			items: [{ value: "1", placeholder: "Item 1" }],
			cursor: { hasNextPage: false, endCursor: null },
		});

		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
			/>,
		);

		const input = screen.getByPlaceholderText("Search for items");
		fireEvent.change(input, { target: { value: "Item" } });

		await waitFor(() => expect(screen.getByText("Item 1")).toBeInTheDocument());
		fireEvent.click(screen.getByText("Item 1"));

		expect(mockOnItemSelected).toHaveBeenCalledWith({ value: "1", placeholder: "Item 1" });
	});

	it("shows loader while fetching data", async () => {
		mockGetDropdownItems.mockImplementation(
			() =>
				new Promise((resolve) => {
					setTimeout(() => resolve({ items: [], cursor: { hasNextPage: false, endCursor: null } }), 1000);
				}),
		);

		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
			/>,
		);

		const input = screen.getByPlaceholderText("Search for items");
		fireEvent.change(input, { target: { value: "Loading" } });

		expect(document.querySelector(".loader")).toBeInTheDocument();
		await waitFor(() => expect(mockGetDropdownItems).toHaveBeenCalled());
	});

	it("handles errors and displays a toast", async () => {
		mockGetDropdownItems.mockRejectedValue(new Error("Error occurred"));

		render(
			<SearchInput
				placeholder="Search for items"
				getDropdownItems={mockGetDropdownItems}
				onItemSelected={mockOnItemSelected}
				errorMessage="Custom error message"
			/>,
		);

		const input = screen.getByPlaceholderText("Search for items");
		fireEvent.change(input, { target: { value: "Error" } });

		await waitFor(() =>
			expect(mockToast).toHaveBeenCalledWith({
				variant: "destructive",
				title: "Custom error message",
			}),
		);
	});
});
