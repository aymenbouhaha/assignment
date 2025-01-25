import * as React from "react";
import { cn } from "@/lib/utils.ts";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"file:bg-transparent file:text-sm file:text-zinc-950 flex w-full rounded-md border border-grey-border px-3 py-2.5 text-primary-black text-p21 lg:text-p3 ring-0 outline-none focus:border-grey-2 file:border-0 file:font-medium placeholder:text-grey-1 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
