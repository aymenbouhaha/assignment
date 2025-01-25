import { Skeleton } from "@shared/components/ui";
import { RepositoryItem } from "@/features/repositories/components/repository-item.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";
import { cn } from "@/lib/utils.ts";

export const RepositoryList = ({
	loading,
	repositories,
	owner,
	containerClassName,
}: {
	owner?: string;
	repositories: RepositoryModel[];
	loading?: boolean;
	containerClassName?: string;
}) => {
	return (
		<>
			<div
				className={cn(
					"flex flex-col gap-3 border border-grey-border bg-[#fff] p-3 rounded-[10px]",
					containerClassName,
					{
						"h-80 justify-center items-center": !loading && repositories.length === 0,
					},
				)}
			>
				{loading ? (
					[0, 1, 2, 3, 5, 6].map((item) => <Skeleton key={`repository-skeleton.${item}`} className={"w-full h-40"} />)
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
		</>
	);
};
