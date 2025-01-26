import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui";
import { ChevronDown } from "lucide-react";
import { Icon } from "@shared/components/icons/icons.tsx";
import React, { useEffect, useState } from "react";

interface SelectInputProps {
	placeholder: string;
	values: { placeholder: string; value: string }[];
	inputClassName?: string;
	contentClassName?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
}

/**
 * The `SelectInput` component renders a customizable select dropdown
 * with support for dynamic values, placeholder text, and clearable input.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - Placeholder text displayed when no value is selected.
 * @param {Array<Object>} props.values - Array of options for the select dropdown.
 * @param {string} props.values[].placeholder - Display text for the option.
 * @param {string} props.values[].value - The actual value of the option.
 * @param {string} [props.inputClassName] - Additional class names for the select trigger (input field).
 * @param {string} [props.contentClassName] - Additional class names for the dropdown content.
 * @param {function} [props.onValueChange] - Callback invoked when the selected value changes.
 * @param {string} [props.defaultValue=""] - Default selected value.
 * @returns {React.JSX} The rendered `SelectInput` component.
 *
 * @example
 * <SelectInput
 *   placeholder="Select an option"
 *   values={[
 *     { placeholder: "Option 1", value: "option1" },
 *     { placeholder: "Option 2", value: "option2" },
 *   ]}
 *   inputClassName="border border-gray-300"
 *   contentClassName="bg-white"
 *   onValueChange={(value) => console.log("Selected:", value)}
 *   defaultValue="option1"
 * />
 */
export const SelectInput = ({
	placeholder,
	values,
	inputClassName,
	contentClassName,
	onValueChange,
	defaultValue = "",
}: SelectInputProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (onValueChange) onValueChange(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className="w-full h-full">
			<Select onValueChange={setValue} defaultValue={defaultValue} value={value} open={open} onOpenChange={setOpen}>
				<div className="relative w-full">
					<SelectTrigger
						className={cn(inputClassName, {
							"text-grey-1": !value,
							"text-primary-black": value,
						})}
					>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					{value ? (
						<Icon.Close
							className={"stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"}
							onClick={() => setValue("")}
						/>
					) : (
						<ChevronDown
							className="stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"
							onClick={() => setOpen(true)}
						/>
					)}
				</div>
				<SelectContent className={cn(contentClassName)}>
					{values.map((item, index) => {
						return (
							<SelectItem key={`${item.value}.${index}`} value={item.value}>
								{item.placeholder}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};
