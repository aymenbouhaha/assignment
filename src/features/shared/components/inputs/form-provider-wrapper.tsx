import { FieldValues, UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";
import { Form } from "@shared/components/ui";

interface FormProviderWrapperProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	onSubmit: (value: T) => void;
	className?: string;
	children: ReactNode;
}

export function FormProviderWrapper<T extends FieldValues>({
	form,
	onSubmit,
	className,
	children,
}: FormProviderWrapperProps<T>) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={className}>
				{children}
			</form>
		</Form>
	);
}
