import { Icon } from "@shared/components/icons/icons.tsx";
import { Input } from "@shared/components/ui";

export const RepositorySearchFilterBar = () => {
	return (
		<div className="flex gap-3">
			<div className="flex relative w-full">
				<div className="absolute inset-y-0 left-3 flex items-center">
					<Icon.Search className={"size-6"} />
				</div>
				<Input placeholder={"Type repository name"} className="pl-10" />
			</div>
		</div>
	);
};
