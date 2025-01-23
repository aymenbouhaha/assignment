import { Dropdown } from "@shared/components/dropdown/dropdown.tsx";
import { ChangeEvent, ReactNode } from "react";
import { FormControl, FormField, FormItem, Input } from "@shared/components/ui";
import { useFormContext } from "react-hook-form";
import { CustomIcon, Icon } from "@shared/components/icons/icons.tsx";
import { cn } from "@/lib/utils.ts";

export const ControlledSearchInput = ({
	fieldName,
	placeholder,
	onSearchChange,
	leadIcon,
	sheetContent,
	setOpen,
	open,
}: {
	fieldName: string;
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		iconClassName?: string;
	};
	onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
	sheetContent: ReactNode;
	setOpen: (value: boolean) => void;
	open: boolean;
}) => {
	const { control } = useFormContext();

	return (
		<Dropdown
			setOpen={setOpen}
			open={open}
			trigger={
				<FormField
					control={control}
					name={fieldName}
					render={({ field }) => (
						<FormItem>
							<div className="flex relative">
								{leadIcon && (
									<div className="absolute inset-y-0 left-3 flex items-center">
										{Icon[leadIcon.icon]({ className: cn("size-5", leadIcon.iconClassName) })}
									</div>
								)}
								<FormControl>
									<Input
										{...field}
										placeholder={placeholder}
										onChange={(e) => {
											field.onChange(e);
											onSearchChange(e);
										}}
										className="pl-10"
									/>
								</FormControl>
								{field.value && !open && (
									<div className="absolute inset-y-0 right-3 flex items-center">
										{
											<Icon.Close
												className={"size-6 stroke-grey-2 cursor-pointer"}
												onClick={() => {
													field.onChange("");
												}}
											/>
										}
									</div>
								)}
							</div>
						</FormItem>
					)}
				/>
			}
			content={sheetContent}
		/>
	);
};
