import { cn } from "@/lib/utils";
import { Input } from "@shared/components/ui";
import { CustomIcon, Icon } from "@shared/components/icons/icons.tsx";
import React, { useEffect, useState } from "react";

interface TextInputProps {
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		className?: string;
	};
	onValueChange?: (value: string) => void;
	inputClassName?: string;
}

/**
 * The `TextInput` component renders a text input field with optional leading and trailing icons,
 * a placeholder, and a callback for handling value changes.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - Placeholder text displayed in the input field.
 * @param {Object} [props.leadIcon] - Optional leading icon displayed inside the input field.
 * @param {CustomIcon} props.leadIcon.icon - Icon type for the leading icon.
 * @param {string} [props.leadIcon.className] - Additional class names for styling the leading icon.
 * @param {function} [props.onValueChange] - Callback invoked when the input value changes.
 * @param {string} [props.inputClassName] - Additional class names for the input field.
 * @returns {React.JSX} The rendered `TextInput` component.
 *
 * @example
 * <TextInput
 *   placeholder="Enter your name"
 *   leadIcon={{ icon: "Search", className: "text-gray-500" }}
 *   onValueChange={(value) => console.log("Input value:", value)}
 *   inputClassName="border border-gray-300"
 * />
 */
export const TextInput = ({
	placeholder,
	inputClassName,
	leadIcon,
	onValueChange,
}: TextInputProps): React.JSX.Element => {
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (onValueChange) onValueChange(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className="w-full relative">
			{leadIcon && (
				<div className="absolute inset-y-0 left-3 flex items-center">
					{Icon[leadIcon.icon]({ className: cn("size-6", leadIcon.className) })}
				</div>
			)}
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={cn(inputClassName, {
					"pl-10": leadIcon,
				})}
			/>
			{value && (
				<Icon.Close
					className={"stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"}
					onClick={() => setValue("")}
				/>
			)}
		</div>
	);
};
