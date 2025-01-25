import { Icon } from "@shared/components/icons/icons.tsx";

export const License = ({ name }: { name: string }) => {
	return (
		<div className="flex gap-1.5 items-center">
			<Icon.Balance className={"size-6 lg:size-5"} />
			<div className="text-p3 text-primary-green lg:text-p4">{name}</div>
		</div>
	);
};
