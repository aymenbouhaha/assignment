import { PrimaryLanguage } from "./primary-language.tsx";
import { License } from "@/features/repositories/components/license.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";
import React from "react";

/**
 * The `RepositoryItem` component displays information about a repository, including its name, description, primary language, and license.
 *
 * @component
 * @example
 * ```tsx
 * <RepositoryItem
 *   repository={{
 *     name: "MyRepo",
 *     url: "https://github.com/user/myrepo",
 *     isPrivate: false,
 *     description: "A sample repository.",
 *     primaryLanguage: { name: "TypeScript", color: "#3178C6" },
 *     licenseInfo: { name: "MIT" },
 *     parent: {
 *       url: "https://github.com/parent/repo",
 *       nameWithOwner: "parent/repo",
 *     },
 *   }}
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {RepositoryModel} props.repository - The repository data model containing details to display.
 *
 * @returns {React.JSX} The rendered `RepositoryItem` component.
 */
export const RepositoryItem = ({ repository }: { repository: RepositoryModel }): React.JSX.Element => {
	return (
		<div className="border border-grey-border rounded-md py-2.5 px-3 flex justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex-flex-col gap-1">
					<div className="flex gap-2 items-center flex-wrap">
						<a
							className="text-p1 !font-semibold text-primary-purple hover:underline hover:underline-offset-3 lg:text-p2 "
							href={repository.url}
						>
							{repository.name}
						</a>
						<div className="px-1 py-[2px] border border-grey-border text-grey-1 text-p4 lg:text-p6 rounded">
							{repository.isPrivate ? "Private" : "Public"}
						</div>
					</div>
					{repository.parent && (
						<div className="text-p4 text-grey-1 lg:text-p5">
							Forked from{" "}
							<a href={repository.parent.url} className={"underline underline-offset-3"}>
								{repository.parent.nameWithOwner}
							</a>
						</div>
					)}
				</div>
				<div className="text-p3 text-primary-black lg:text-p5">{repository.description}</div>
				<div className="flex gap-3">
					{repository.primaryLanguage && (
						<PrimaryLanguage name={repository.primaryLanguage.name} color={repository.primaryLanguage.color} />
					)}
					{repository.licenseInfo && <License name={repository.licenseInfo.name} />}
				</div>
			</div>
		</div>
	);
};
