import { Skeleton } from "@shared/components/ui";
import { RepositoryItem } from "@/features/repositories/components/repository-item.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";
import { cn } from "@/lib/utils.ts";
import React from "react";

type RepositoryListProps = {
	owner?: string;
	repositories: RepositoryModel[];
	loading?: boolean;
	containerClassName?: string;
};

/**
 * The `RepositoryList` component displays a list of repositories with support for loading states and empty results.
 *
 * @component
 * @example
 * ```tsx
 * <RepositoryList
 *   loading={true}
 *   repositories={[]}
 *   owner="John Doe"
 *   containerClassName="custom-class"
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Indicates if the repositories are loading.
 * @param {RepositoryModel[]} props.repositories - An array of repository objects to display.
 * @param {string} [props.owner] - The owner of the repositories, used for empty state messages.
 * @param {string} [props.containerClassName] - Additional CSS classes for the container.
 *
 * @returns {React.JSX} The rendered `RepositoryList` component.
 */
export const RepositoryList = ({
	loading,
	repositories,
	owner,
	containerClassName,
}: RepositoryListProps): React.JSX.Element => {
	return (
		<div
			className={cn("flex flex-col gap-3 border border-grey-border bg-[#fff] p-3 rounded-[10px]", containerClassName, {
				"h-80 justify-center items-center": !loading && repositories.length === 0,
			})}
		>
			{loading ? (
				[0, 1, 2, 3, 4, 5].map((item) => <Skeleton key={`repository-skeleton.${item}`} className={"w-full h-40"} />)
			) : repositories.length ? (
				repositories.map((item, index) => (
					<RepositoryItem key={`repository-item.${item.id}.${index}`} repository={item} />
				))
			) : (
				<div className="text-grey-1 text-h1 !font-bold lg:text-p2 text-center">
					{owner ?? "User"} doesn’t have any repositories that match.
				</div>
			)}
		</div>
	);
};
