import { FormProviderWrapper } from "@shared/components/inputs/form-provider-wrapper.tsx";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@shared/components/inputs/controlled-text-input.tsx";
import { ControlledSelectInput } from "@shared/components/inputs/controlled-select-input.tsx";
import {
	repositoryFilterDefault,
	RepositoryFilterModel,
	RepositoryFilterSchema,
} from "@/features/repositories/models/repository-filter.model.ts";
import { zodResolver } from "@hookform/resolvers/zod";

export const RepositorySearchFilterBar = () => {
	const form = useForm<RepositoryFilterModel>({
		resolver: zodResolver(RepositoryFilterSchema),
		defaultValues: repositoryFilterDefault,
	});
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
				<ControlledSelectInput
					fieldName={"language"}
					values={[{ placeholder: "Aymen", value: "Aymen" }]}
					placeholder={"Languages"}
				/>
			</div>
		</FormProviderWrapper>
	);
};
