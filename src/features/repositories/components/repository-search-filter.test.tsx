import { render, screen, fireEvent } from "@testing-library/react";
import { RepositorySearchFilterBar } from "@repositories/components";
import { repositoryFilterDefault } from "@repositories/models/repository-filter.model.ts";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("RepositorySearchFilterBar", () => {
	const mockOnFilterValuesChange = vi.fn();

	beforeEach(() => {
		mockOnFilterValuesChange.mockClear();
	});

	it("renders input fields correctly when languages are provided", () => {
		const { container } = render(
			<RepositorySearchFilterBar
				languages={["JavaScript", "Python", "Java"]}
				onFilterValuesChange={mockOnFilterValuesChange}
			/>,
		);

		expect(container).toMatchSnapshot();
	});

	it("displays skeleton loaders when languages are not provided", () => {
		const { container } = render(<RepositorySearchFilterBar onFilterValuesChange={mockOnFilterValuesChange} />);

		expect(container).toMatchSnapshot();
	});

	it("calls onFilterValuesChange with updated repository name", () => {
		render(
			<RepositorySearchFilterBar
				languages={["JavaScript", "Python"]}
				onFilterValuesChange={mockOnFilterValuesChange}
			/>,
		);

		const repoInput = screen.getByPlaceholderText("Type repository name");
		fireEvent.change(repoInput, { target: { value: "my-repo" } });

		expect(mockOnFilterValuesChange).toHaveBeenCalledWith({
			...repositoryFilterDefault,
			repository: "my-repo",
		});
	});

	it("calls onFilterValuesChange with updated language", () => {
		render(
			<RepositorySearchFilterBar
				languages={["JavaScript", "Python"]}
				onFilterValuesChange={mockOnFilterValuesChange}
			/>,
		);

		const languageSelectTrigger = screen.getByText("Languages");
		expect(languageSelectTrigger).toBeInTheDocument();

		fireEvent.click(languageSelectTrigger!);

		const pythonOption = screen.getByText("Python");
		expect(pythonOption).toBeInTheDocument();
		fireEvent.click(pythonOption!);

		expect(mockOnFilterValuesChange).toHaveBeenCalledWith({
			...repositoryFilterDefault,
			language: "Python",
		});
	});

	it("updates both repository name and language correctly", () => {
		render(
			<RepositorySearchFilterBar
				languages={["JavaScript", "Python"]}
				onFilterValuesChange={mockOnFilterValuesChange}
			/>,
		);

		const repoInput = screen.getByPlaceholderText("Type repository name");
		fireEvent.change(repoInput, { target: { value: "new-repo" } });

		const languageSelectTrigger = screen.getByText("Languages");
		expect(languageSelectTrigger).toBeInTheDocument();

		fireEvent.click(languageSelectTrigger!);

		const pythonOption = screen.getByText("JavaScript");
		expect(pythonOption).toBeInTheDocument();
		fireEvent.click(pythonOption!);

		expect(mockOnFilterValuesChange).toHaveBeenLastCalledWith({
			repository: "new-repo",
			language: "JavaScript",
		});
	});
});
