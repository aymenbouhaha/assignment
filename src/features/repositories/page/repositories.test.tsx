import { render, screen } from "@testing-library/react";
import { useLazyQuery } from "@apollo/client";
import { Repositories } from "@repositories/page/repositories.tsx";
import { describe, it, vi, expect } from "vitest";

vi.mock("@apollo/client", async () => {
	const actual = await vi.importActual<typeof import("@apollo/client")>("@apollo/client");
	return {
		...actual,
		useLazyQuery: vi.fn(),
	};
});

const mockRepositoriesData = {
	search: {
		nodes: [
			{
				id: "1",
				name: "Test Repo 1",
				url: "https://github.com/test-repo1",
				isPrivate: false,
				primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
				licenseInfo: { name: "MIT" },
				description: "Test description",
				parent: null,
				__typename: "Repository",
			},
		],
		pageInfo: {
			hasNextPage: false,
			hasPreviousPage: false,
			startCursor: null,
			endCursor: null,
		},
	},
};

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });

describe("Repositories Component", () => {
	it("renders the component with loading state", async () => {
		(useLazyQuery as ReturnType<typeof vi.fn>).mockReturnValue([vi.fn(), { data: null, loading: true, error: null }]);

		render(<Repositories />);

		expect(screen.getAllByTestId("skeleton-loader").length).toBeGreaterThan(4);
	});

	it("renders the component with data", async () => {
		(useLazyQuery as ReturnType<typeof vi.fn>).mockReturnValue([
			vi.fn(),
			{ data: mockRepositoriesData, loading: false, error: null },
		]);

		render(<Repositories />);

		expect(screen.getByText("Test Repo 1")).toBeInTheDocument();
		expect(screen.getByText("Test description")).toBeInTheDocument();
	});

	it("displays an error message when the query fails", async () => {
		(useLazyQuery as ReturnType<typeof vi.fn>).mockReturnValue([
			vi.fn(),
			{ data: undefined, loading: false, error: new Error("An error occurred") },
		]);

		render(<Repositories />);

		expect(screen.getByTestId("error-component")).toBeInTheDocument();
	});

	it("loads previous repositories when the previous button is clicked", async () => {
		const modifiedMockRepositoriesData = {
			search: {
				nodes: mockRepositoriesData.search.nodes,
				pageInfo: {
					hasNextPage: false,
					hasPreviousPage: true,
					startCursor: "PreviousCursor",
					endCursor: null,
				},
			},
		};

		const mockGetRepositories = vi.fn();
		(useLazyQuery as ReturnType<typeof vi.fn>).mockReturnValue([
			mockGetRepositories,
			{
				data: modifiedMockRepositoriesData,
				loading: false,
				error: null,
			},
		]);

		render(<Repositories />);

		const prevButton = screen.getByText("Previous");
		prevButton.click();

		expect(mockGetRepositories).toHaveBeenCalledWith({
			variables: expect.objectContaining({
				before: modifiedMockRepositoriesData.search.pageInfo.startCursor,
			}),
		});
	});

	it("loads next repositories when the next button is clicked", async () => {
		const modifiedMockRepositoriesData = {
			search: {
				nodes: mockRepositoriesData.search.nodes,
				pageInfo: {
					hasNextPage: true,
					hasPreviousPage: false,
					startCursor: null,
					endCursor: "NextCursor",
				},
			},
		};

		const mockGetRepositories = vi.fn();
		(useLazyQuery as ReturnType<typeof vi.fn>).mockReturnValue([
			mockGetRepositories,
			{
				data: modifiedMockRepositoriesData,
				loading: false,
				error: null,
			},
		]);

		render(<Repositories />);

		const nextButton = screen.getByText("Next");
		nextButton.click();

		expect(mockGetRepositories).toHaveBeenCalledWith({
			variables: expect.objectContaining({
				after: modifiedMockRepositoriesData.search.pageInfo.endCursor,
			}),
		});
	});
});
