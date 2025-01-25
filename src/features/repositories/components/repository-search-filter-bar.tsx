import { TextInput } from "@shared/components/inputs/text-input.tsx";
import { SelectInput } from "@shared/components/inputs/select-input.tsx";
import {
	repositoryFilterDefault,
	RepositoryFilterModel,
} from "@/features/repositories/models/repository-filter.model.ts";
import { Skeleton } from "@shared/components/ui";
import { useEffect, useState } from "react";

export const RepositorySearchFilterBar = ({
	languages,
	onFilterValuesChange,
}: {
	languages?: string[];
	onFilterValuesChange: (value: RepositoryFilterModel) => void;
}) => {
	const [filterValues, setFilterValues] = useState<RepositoryFilterModel>(repositoryFilterDefault);

	const onRepositoryChange = (value: string) => {
		setFilterValues((prev) => ({ ...prev, repository: value }));
	};

	const onLanguageChange = (value: string) => {
		setFilterValues((prev) => ({ ...prev, language: value }));
	};

	useEffect(() => {
		onFilterValuesChange(filterValues);
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
					<Skeleton className={"h-full"} />
				)}
			</div>
		</div>
	);
};
