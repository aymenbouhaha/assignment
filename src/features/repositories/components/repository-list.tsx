import { Skeleton } from "@shared/components/ui";
import { RepositoryItem } from "@/features/repositories/components/repository-item.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";

export const RepositoryList = ({
	loading,
	repositories,
	owner,
}: {
	owner?: string;
	repositories: RepositoryModel[];
	loading?: boolean;
}) => {
	return loading ? (
		[0, 1, 2, 3, 5, 6].map((item) => <Skeleton key={`repository-skeleton.${item}`} className={"w-full h-40"} />)
	) : repositories.length ? (
		repositories.map((item, index) => <RepositoryItem key={`repository-item.${item.id}.${index}`} repository={item} />)
	) : (
		<div className="text-grey-1 text-h1 !font-bold lg:text-p2 text-center">
			{owner ?? "User"} doesn’t have any repositories that match.
		</div>
	);
};
