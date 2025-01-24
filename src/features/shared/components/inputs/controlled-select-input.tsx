import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
	FormControl,
	FormField,
	FormItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/components/ui";
import { ChevronDown } from "lucide-react";
import { Icon } from "@shared/components/icons/icons.tsx";
import { useState } from "react";

interface ControlledSelectInputProps {
	placeholder: string;
	fieldName: string;
	values: { placeholder: string; value: string }[];
	inputClassName?: string;
	contentClassName?: string;
}

export const ControlledSelectInput = ({
	placeholder,
	fieldName,
	values,
	inputClassName,
	contentClassName,
}: ControlledSelectInputProps) => {
	const { control } = useFormContext();
	const [open, setOpen] = useState(false);

	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => {
				return (
					<FormItem className="w-full h-full">
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
							open={open}
							onOpenChange={setOpen}
						>
							<FormControl>
								<div className="relative w-full">
									<SelectTrigger
										className={cn(inputClassName, {
											"text-grey-1": !field.value,
											"text-primary-black": field.value,
										})}
									>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
									{field.value ? (
										<Icon.Close
											className={"stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"}
											onClick={() => field.onChange("")}
										/>
									) : (
										<ChevronDown
											className="stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"
											onClick={() => setOpen(true)}
										/>
									)}
								</div>
							</FormControl>
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
					</FormItem>
				);
			}}
		/>
	);
};
