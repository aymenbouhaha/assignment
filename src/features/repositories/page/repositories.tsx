import { RepositoryItem } from "@/features/repositories/components/repository-item.tsx";
import { RepositoryPageHeader } from "@/features/repositories/components/repository-page-header.tsx";
import { RepositorySearchFilterBar } from "@/features/repositories/components/repository-search-filter-bar.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";
import { useLazyQuery } from "@apollo/client";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { GetRepositoriesQuery } from "@/features/repositories/api/get-repositories-query.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	repositoryFilterDefault,
	RepositoryFilterModel,
	RepositoryFilterSchema,
} from "@/features/repositories/models/repository-filter.model.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@shared/components/ui";
import { useDebounce } from "@shared/hooks/use-debounce.ts";
import { cn } from "@/lib/utils.ts";
import { paginationDefaultValues, PaginationModel } from "@shared/models/pagination.model.ts";
import { API_LIMIT } from "@/features/repositories/constants/constants.ts";
import { PaginationButton } from "@shared/components/buttons/pagination-button.tsx";
import { ErrorComponent } from "@shared/components/others/error-component.tsx";

export const Repositories = () => {
	const { login } = useParams();

	const form = useForm<RepositoryFilterModel>({
		resolver: zodResolver(RepositoryFilterSchema),
		defaultValues: repositoryFilterDefault,
	});

	const { language, repository } = form.watch();
	const debouncedRepository = useDebounce(repository, 200);

	const [getRepositories] = useLazyQuery<SearchQueryResultModel<RepositoryModel>>(GetRepositoriesQuery, {
		fetchPolicy: "network-only",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [cursor, setCursor] = useState<PaginationModel>(paginationDefaultValues);

	const [repositories, setRepositories] = useState<RepositoryModel[]>([]);
	const [languages, setLanguages] = useState<string[] | undefined>();

	useEffect(() => {
		setCursor(paginationDefaultValues);
		setRepositories([]);
		setIsError(false);
		loadRepositories(null, null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login, language, debouncedRepository]);

	async function loadRepositories(after: string | null, before: string | null) {
		setLoading(true);
		let query = `owner:${login} fork:true is:private is:public sort:updated`;
		if (language) query += ` language:${language}`;
		if (debouncedRepository) query += ` ${debouncedRepository} in:name`;

		try {
			const result = await getRepositories({
				variables: { after, before, query, first: before ? null : API_LIMIT, last: before ? API_LIMIT : null },
			});
			if (result.error) {
				throw new Error(result.error.message);
			}
			if (result.data) {
				const { nodes, pageInfo } = result.data.search;
				const newLanguages = nodes.map((item) => item.primaryLanguage?.name).filter((item) => item !== undefined);

				setLanguages((prevLanguages) => Array.from(new Set([...(prevLanguages ?? []), ...newLanguages])));
				setRepositories(nodes.filter((item) => item.__typename === "Repository"));
				setCursor(pageInfo);
			}
		} catch (e) {
			setIsError(true);
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className={"py-16 px-60 flex flex-col gap-9 lg:p-4"}>
			<RepositoryPageHeader login={login!} />
			<div className="flex flex-col gap-4">
				{isError ? (
					<ErrorComponent />
				) : (
					<>
						<RepositorySearchFilterBar form={form} languages={languages} />
						<div
							className={cn("flex flex-col gap-3 border border-grey-border bg-[#fff] p-3 rounded-[10px]", {
								"h-80 justify-center items-center": !loading && repositories.length === 0,
							})}
						>
							{loading ? (
								[0, 1, 2, 3, 5, 6].map((item) => (
									<Skeleton key={`repository-skeleton.${item}`} className={"w-full h-40 "} />
								))
							) : repositories.length ? (
								<>
									{repositories.map((item, index) => (
										<RepositoryItem key={`repository-item.${item.id}.${index}`} repository={item} />
									))}
								</>
							) : (
								<div className="text-grey-1 text-h1 !font-bold lg:text-p2 text-center">
									{login} doesn’t have any repositories that match.
								</div>
							)}
						</div>
						{repositories.length > 0 && (
							<PaginationButton
								previousButton={{
									onClick: () => {
										loadRepositories(null, cursor.startCursor);
										window.scrollTo({ top: 0, behavior: "smooth" });
									},
									disabled: !cursor.hasPreviousPage,
								}}
								nextButton={{
									onClick: () => {
										loadRepositories(cursor.endCursor, null);
										window.scrollTo({ top: 0, behavior: "smooth" });
									},
									disabled: !cursor.hasNextPage,
								}}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};
