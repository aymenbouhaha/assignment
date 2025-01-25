import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui";
import { ChevronDown } from "lucide-react";
import { Icon } from "@shared/components/icons/icons.tsx";
import { useEffect, useState } from "react";

interface SelectInputProps {
	placeholder: string;
	values: { placeholder: string; value: string }[];
	inputClassName?: string;
	contentClassName?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
}

export const SelectInput = ({
	placeholder,
	values,
	inputClassName,
	contentClassName,
	onValueChange,
	defaultValue = "",
}: SelectInputProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (onValueChange) onValueChange(value);
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
