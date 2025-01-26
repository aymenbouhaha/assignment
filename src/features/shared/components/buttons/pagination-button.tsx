import { Button, ButtonProps } from "@shared/components/ui";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

/**
 * The `PaginationButton` component provides navigation buttons for paginated content,
 * allowing users to move to the previous or next set of items.
 *
 * @component
 * @example
 * ```tsx
 * <PaginationButton
 *   previousButton={{
 *     onClick: handlePrevious,
 *     disabled: isFirstPage,
 *   }}
 *   nextButton={{
 *     onClick: handleNext,
 *     disabled: isLastPage,
 *   }}
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {Omit<ButtonProps, "size" | "variant">} props.previousButton - Props for the "Previous" button, excluding `size` and `variant`.
 * @param {Omit<ButtonProps, "size" | "variant">} props.nextButton - Props for the "Next" button, excluding `size` and `variant`.
 *
 * @returns {React.JSX} The rendered pagination button component.
 */
export const PaginationButton = ({
	previousButton,
	nextButton,
}: {
	previousButton: Omit<ButtonProps, "size" | "variant" | "children">;
	nextButton: Omit<ButtonProps, "size" | "variant" | "children">;
}): React.JSX.Element => {
	return (
		<div className="w-full flex gap-4 items-center justify-center">
			<Button variant={"pagination"} size={"pagination"} {...previousButton}>
				<MoveLeft />
				Previous
			</Button>
			<Button variant={"pagination"} size={"pagination"} {...nextButton}>
				Next
				<MoveRight />
			</Button>
		</div>
	);
};
