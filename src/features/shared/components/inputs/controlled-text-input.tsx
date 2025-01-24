import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, Input } from "@shared/components/ui";
import { CustomIcon, Icon } from "@shared/components/icons/icons.tsx";

interface ControlledTextInputProps {
	placeholder: string;
	fieldName: string;
	type?: string;
	leadIcon?: {
		icon: CustomIcon;
		className?: string;
	};
	inputClassName?: string;
	disabled?: boolean;
}

export const ControlledTextInput = ({
	placeholder,
	fieldName,
	type,
	inputClassName,
	leadIcon,
}: ControlledTextInputProps) => {
	const { control } = useFormContext();
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormControl className={"relative w-full"}>
						<div className="w-full relative">
							{leadIcon && (
								<div className="absolute inset-y-0 left-3 flex items-center">
									{Icon[leadIcon.icon]({ className: cn("size-6", leadIcon.className) })}
								</div>
							)}
							<Input
								placeholder={placeholder}
								type={type}
								{...field}
								className={cn(inputClassName, {
									"pl-10": leadIcon,
								})}
							/>
							{field.value && (
								<Icon.Close
									className={"stroke-grey-2 absolute size-6 top-1/2 -translate-y-1/2 right-3 cursor-pointer"}
									onClick={() => field.onChange("")}
								/>
							)}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};
