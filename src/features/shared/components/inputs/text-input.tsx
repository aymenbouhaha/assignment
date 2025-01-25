import { cn } from "@/lib/utils";
import { Input } from "@shared/components/ui";
import { CustomIcon, Icon } from "@shared/components/icons/icons.tsx";
import { useEffect, useState } from "react";

interface TextInputProps {
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		className?: string;
	};
	onValueChange?: (value: string) => void;
	inputClassName?: string;
}

export const TextInput = ({ placeholder, inputClassName, leadIcon, onValueChange }: TextInputProps) => {
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (onValueChange) onValueChange(value);
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
