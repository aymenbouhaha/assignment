import { FormProviderWrapper } from "@shared/components/inputs/form-provider-wrapper.tsx";
import { UseFormReturn } from "react-hook-form";
import { ControlledTextInput } from "@shared/components/inputs/controlled-text-input.tsx";
import { ControlledSelectInput } from "@shared/components/inputs/controlled-select-input.tsx";
import { RepositoryFilterModel } from "@/features/repositories/models/repository-filter.model.ts";
import { Skeleton } from "@shared/components/ui";

export const RepositorySearchFilterBar = ({
	form,
	languages,
}: {
	form: UseFormReturn<RepositoryFilterModel>;
	languages?: string[];
}) => {
	return (
		<FormProviderWrapper form={form} className="flex gap-3" onSubmit={() => {}}>
			<div className="flex-[3]">
				<ControlledTextInput
					placeholder={"Type repository name"}
					fieldName={"repository"}
					leadIcon={{ icon: "Search" }}
				/>
			</div>
			<div className="flex-1">
				{languages ? (
					<ControlledSelectInput
						fieldName={"language"}
						values={languages.map((item) => ({ placeholder: item, value: item }))}
						placeholder={"Languages"}
					/>
				) : (
					<Skeleton className={"h-full"} />
				)}
			</div>
		</FormProviderWrapper>
	);
};
