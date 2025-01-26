import { useBlur } from "@shared/hooks/user-blur.ts";
import { cn } from "@/lib/utils.ts";
import React, { ReactNode } from "react";

/**
 * The `Dropdown` component provides a reusable dropdown menu with a trigger element and a customizable content area.
 * It supports opening and closing based on blur events and integrates a utility to detect clicks inside/outside the dropdown.
 *
 * @component
 * @example
 * ```tsx
 * <Dropdown
 *   open={isOpen}
 *   setOpen={setIsOpen}
 *   trigger={<button onClick={() => setIsOpen(!isOpen)}>Open Dropdown</button>}
 *   content={
 *     <ul>
 *       <li>Option 1</li>
 *       <li>Option 2</li>
 *       <li>Option 3</li>
 *     </ul>
 *   }
 *   contentBoxClassName="custom-class"
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {(value: boolean) => void} props.setOpen - Function to update the open state of the dropdown.
 * @param {boolean} props.open - Whether the dropdown is open or not.
 * @param {ReactNode} props.trigger - The element that triggers the dropdown to open/close.
 * @param {ReactNode} props.content - The content to display inside the dropdown.
 * @param {string} [props.contentBoxClassName] - Additional class names for styling the dropdown content box.
 *
 * @returns {React.JSX} The rendered dropdown component.
 */
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
}): React.JSX.Element => {
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
