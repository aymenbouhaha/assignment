import { TextInput } from "@shared/components/inputs/text-input.tsx";
import { SelectInput } from "@shared/components/inputs/select-input.tsx";
import { repositoryFilterDefault, RepositoryFilterModel } from "@repositories/models/repository-filter.model.ts";
import { Skeleton } from "@shared/components/ui";
import React, { useEffect, useState } from "react";

type RepositorySearchFilterBarProps = {
	languages?: string[];
	onFilterValuesChange: (value: RepositoryFilterModel) => void;
};

/**
 * The `RepositorySearchFilterBar` component provides a search and filter interface for repositories,
 * allowing users to filter by repository name and programming language.
 *
 * @component
 * @example
 * ```tsx
 * <RepositorySearchFilterBar
 *   languages={["JavaScript", "Python", "TypeScript"]}
 *   onFilterValuesChange={(filterValues) => console.log(filterValues)}
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {string[]} [props.languages] - A list of available programming languages for filtering.
 * @param {(value: RepositoryFilterModel) => void} props.onFilterValuesChange - Callback triggered when filter values change.
 *
 * @returns {React.JSX} The rendered `RepositorySearchFilterBar` component.
 */
export const RepositorySearchFilterBar = ({
	languages,
	onFilterValuesChange,
}: RepositorySearchFilterBarProps): React.JSX.Element => {
	const [filterValues, setFilterValues] = useState<RepositoryFilterModel>(repositoryFilterDefault);

	const onRepositoryChange = (value: string) => {
		setFilterValues((prev) => ({ ...prev, repository: value }));
	};

	const onLanguageChange = (value: string) => {
		setFilterValues((prev) => ({ ...prev, language: value }));
	};

	useEffect(() => {
		onFilterValuesChange(filterValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValues]);

	return (
		<div className="flex gap-3 lg:flex-col lg:gap-2">
			<div className="flex-[3]">
				{languages ? (
					<TextInput
						placeholder={"Type repository name"}
						onValueChange={onRepositoryChange}
						leadIcon={{ icon: "Search" }}
					/>
				) : (
					<Skeleton className={"h-12"} />
				)}
			</div>
			<div className="flex-1">
				{languages ? (
					<SelectInput
						onValueChange={onLanguageChange}
						values={languages.map((item) => ({ placeholder: item, value: item }))}
						placeholder={"Languages"}
					/>
				) : (
					<Skeleton className={"h-12"} />
				)}
			</div>
		</div>
	);
};
