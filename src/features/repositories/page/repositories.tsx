import { useLazyQuery } from "@apollo/client";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PaginationButton } from "@shared/components/buttons/pagination-button.tsx";
import { ErrorComponent } from "@shared/components/others/error-component.tsx";
import { useDebounce } from "@shared/hooks";
import { repositoryFilterDefault, RepositoryFilterModel } from "@repositories/models/repository-filter.model.ts";
import { RepositoryList, RepositoryPageHeader, RepositorySearchFilterBar } from "@repositories/components";
import { RepositoryModel } from "@repositories/models/repository.model.ts";
import { GetRepositoriesQuery } from "@repositories/api/get-repositories-query.ts";
import { API_LIMIT } from "@repositories/constants/constants.ts";

/**
 * The `Repositories` component provides a paginated and searchable view of a user's repositories.
 * It supports filtering by repository name and language, and handles data fetching using GraphQL.
 *
 * @component
 *
 * @returns {React.JSX} The rendered `Repositories` component.
 */
export const Repositories = (): React.JSX.Element => {
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

	/**
	 * Fetches repositories using the given cursor for pagination.
	 *
	 * @param {string | null} after - The cursor to fetch the next page.
	 * @param {string | null} before - The cursor to fetch the previous page.
	 */
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
