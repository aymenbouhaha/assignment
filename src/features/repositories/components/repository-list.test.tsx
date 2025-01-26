import { render } from "@testing-library/react";
import { RepositoryList } from "@/features/repositories/components/repository-list";
import { describe, it, expect } from "vitest";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";

const mockRepositories: RepositoryModel[] = [
	{
		id: "1",
		name: "Test Repo 1",
		description: "Description of Test Repo 1",
		parent: { nameWithOwner: "ParentRepoOwner/ParentRepo1", url: "https://github.com/ParentRepoOwner/ParentRepo1" },
		url: "https://github.com/User/TestRepo1",
		primaryLanguage: { name: "JavaScript", color: "#f1e05a", id: "JavaScript_ID" },
		licenseInfo: { name: "MIT" },
		isPrivate: false,
	},
	{
		id: "2",
		name: "Test Repo 2",
		description: "Description of Test Repo 2",
		parent: null,
		url: "https://github.com/User/TestRepo2",
		primaryLanguage: { name: "Python", color: "#3572A5", id: "Python_ID" },
		licenseInfo: { name: "Apache 2.0" },
		isPrivate: true,
	},
];

export default mockRepositories;

describe("RepositoryList Component Snapshots", () => {
	it("matches snapshot when loading is true", () => {
		const { container } = render(<RepositoryList loading={true} repositories={[]} />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with repositories", () => {
		const { container } = render(<RepositoryList loading={false} repositories={mockRepositories} />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with no repositories and a custom owner", () => {
		const { container } = render(<RepositoryList loading={false} repositories={[]} owner="Test User" />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with no repositories and default owner", () => {
		const { container } = render(<RepositoryList loading={false} repositories={[]} />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with a custom container class", () => {
		const customClass = "custom-container-class";
		const { container } = render(<RepositoryList loading={false} repositories={[]} containerClassName={customClass} />);
		expect(container).toMatchSnapshot();
	});
});
