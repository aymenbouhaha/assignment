import { cn } from "@/lib/utils.ts";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-grey-border", className)}
			data-testid="skeleton-loader"
			{...props}
		/>
	);
}

export { Skeleton };
