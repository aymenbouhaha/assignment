import { RepositoryItem } from "@/features/repositories/components/repository-item.tsx";
import { RepositoryPageHeader } from "@/features/repositories/components/repository-page-header.tsx";
import { RepositorySearchFilterBar } from "@/features/repositories/components/repository-search-filter-bar.tsx";

export const Repositories = () => {
	return (
		<div className={"py-16 px-60 flex flex-col gap-9"}>
			<RepositoryPageHeader />
			<div className="flex flex-col gap-4">
				<RepositorySearchFilterBar />
				<div className="flex flex-col gap-3 border border-grey-border bg-[#fff] p-3 rounded-[10px]">
					<RepositoryItem />
					<RepositoryItem />
					<RepositoryItem />
					<RepositoryItem />
					<RepositoryItem />
					<RepositoryItem />
					<RepositoryItem />
				</div>
			</div>
		</div>
	);
};
