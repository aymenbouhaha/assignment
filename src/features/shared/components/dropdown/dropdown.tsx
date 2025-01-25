import { useBlur } from "@shared/hooks/user-blur.ts";
import { cn } from "@/lib/utils.ts";
import { ReactNode } from "react";

export const Dropdown = ({
	setOpen,
	open,
	trigger,
	content,
	contentBoxClassName,
}: {
	setOpen: (value: boolean) => void;
	open: boolean;
	trigger: ReactNode;
	content: ReactNode;
	contentBoxClassName?: string;
}) => {
	const { ref, isInside } = useBlur();

	return (
		<div
			className="relative w-full"
			tabIndex={2}
			ref={ref}
			onBlur={() => {
				if (!isInside) {
					setOpen(false);
				}
			}}
		>
			{trigger}
			{open && (
				<div
					className={cn(
						"absolute z-20 top-14 left-0 w-full bg-[#fff] rounded-md border border-grey-border shadow-drop-down flex flex-col max-h-[200px] overflow-y-scroll scrollbar-theme",
						contentBoxClassName,
					)}
				>
					{content}
				</div>
			)}
		</div>
	);
};
