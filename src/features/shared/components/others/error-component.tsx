import { Button } from "@shared/components/ui";
import React from "react";

/**
 * The `ErrorComponent` displays an error message with a reload button.
 * It is a user-friendly way to inform users of an issue and provide a quick option to refresh the page.
 *
 * @component
 * @example
 * ```tsx
 * <ErrorComponent message="Unable to load data. Please try again later." />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {string} [props.message="Something went wrong. Please try again later."] - The error message to display.
 *
 * @returns {React.JSX} The rendered error component.
 */
export const ErrorComponent = ({
	message = "Something went wrong. Please try again later.",
}: {
	message?: string;
}): React.JSX.Element => {
	return (
		<div
			className="flex flex-col gap-4 justify-center items-center bg-primary-red/5 border border-primary-red rounded-lg text-center shadow-drop-down h-[500px]"
			data-testid={"error-component"}
		>
			<div className="text-h1 font-sans text-primary-red">Oops!</div>
			<div className="text-p2 font-sans text-grey-2">{message}</div>
			<Button onClick={() => window.location.reload()} variant={"restart"} className="w-fit !p-5">
				Reload Page
			</Button>
		</div>
	);
};
