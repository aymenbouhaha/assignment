import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RepositoryItem } from "@repositories/components";
import { RepositoryModel } from "@repositories/models/repository.model.ts";

const mockRepository: RepositoryModel = {
	id: "1",
	name: "Test Repo",
	description: "Test description of the repository.",
	parent: { nameWithOwner: "parent/repo", url: "https://github.com/parent/repo" },
	url: "https://github.com/test-user/test-repo",
	primaryLanguage: { name: "JavaScript", color: "#f1e05a", id: "JavaScript_ID" },
	licenseInfo: { name: "MIT" },
	isPrivate: false,
};

describe("RepositoryItem Snapshot", () => {
	it("matches the snapshot", () => {
		const { asFragment } = render(<RepositoryItem repository={mockRepository} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
