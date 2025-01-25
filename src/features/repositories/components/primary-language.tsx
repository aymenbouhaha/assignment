import { Icon } from "@shared/components/icons/icons.tsx";

export const PrimaryLanguage = ({ name, color }: { name: string; color: string }) => {
	return (
		<div className="flex gap-1.5 items-center">
			<Icon.Dot
				className={"size-3.5"}
				style={{
					fill: color,
				}}
			/>
			<div
				className="text-p3"
				style={{
					color: color,
				}}
			>
				{name}
			</div>
		</div>
	);
};
