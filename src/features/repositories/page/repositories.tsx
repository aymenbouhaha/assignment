import { RepositoryPageHeader } from "@/features/repositories/components/repository-page-header.tsx";
import { RepositorySearchFilterBar } from "@/features/repositories/components/repository-search-filter-bar.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";
import { useLazyQuery } from "@apollo/client";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { GetRepositoriesQuery } from "@/features/repositories/api/get-repositories-query.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	repositoryFilterDefault,
	RepositoryFilterModel,
} from "@/features/repositories/models/repository-filter.model.ts";
import { useDebounce } from "@shared/hooks/use-debounce.ts";
import { API_LIMIT } from "@/features/repositories/constants/constants.ts";
import { PaginationButton } from "@shared/components/buttons/pagination-button.tsx";
import { ErrorComponent } from "@shared/components/others/error-component.tsx";
import { RepositoryList } from "@/features/repositories/components/repository-list.tsx";

export const Repositories = () => {
	const { login } = useParams();

	const [filters, setFilters] = useState<RepositoryFilterModel>(repositoryFilterDefault);
	const { language, repository } = filters;

	const debouncedRepository = useDebounce(repository, 200);

	const [getRepositories, result] = useLazyQuery<SearchQueryResultModel<RepositoryModel>>(GetRepositoriesQuery);

	const [languages, setLanguages] = useState<string[] | undefined>();
	const [repositories, setRepositories] = useState<RepositoryModel[]>([]);

	useEffect(() => {
		loadRepositories(null, null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login, language, debouncedRepository]);

	async function loadRepositories(after: string | null, before: string | null) {
		let query = `owner:${login} fork:true is:private is:public sort:updated`;
		if (language) query += ` language:${language}`;
		if (debouncedRepository) query += ` ${debouncedRepository} in:name`;
		getRepositories({
			variables: { after, before, query, first: before ? null : API_LIMIT, last: before ? API_LIMIT : null },
		});
	}

	useEffect(() => {
		if (result.data) {
			const { nodes } = result.data.search;
			const newLanguages = nodes.map((item) => item.primaryLanguage?.name).filter((item) => item !== undefined);
			setLanguages((prevLanguages) => Array.from(new Set([...(prevLanguages ?? []), ...newLanguages])));
			setRepositories(result.data.search.nodes.filter((item) => item.__typename === "Repository"));
		}
	}, [result]);

	return (
		<div className={"py-16 px-60 flex flex-col gap-9 lg:p-4"}>
			<RepositoryPageHeader login={login!} />
			<div className="flex flex-col gap-4">
				{result.error ? (
					<ErrorComponent />
				) : (
					<>
						<RepositorySearchFilterBar onFilterValuesChange={setFilters} languages={languages} />
						<RepositoryList owner={login} repositories={repositories} loading={result.loading} />
						{repositories.length > 0 && result.data && (
							<PaginationButton
								previousButton={{
									onClick: () => {
										loadRepositories(null, result.data!.search.pageInfo.startCursor);
										window.scrollTo({ top: 0, behavior: "smooth" });
									},
									disabled: !result.data!.search.pageInfo.hasPreviousPage,
								}}
								nextButton={{
									onClick: () => {
										loadRepositories(result.data!.search.pageInfo.endCursor, null);
										window.scrollTo({ top: 0, behavior: "smooth" });
									},
									disabled: !result.data!.search.pageInfo.hasNextPage,
								}}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};
