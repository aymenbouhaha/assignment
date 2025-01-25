import { Button, ButtonProps } from "@shared/components/ui";
import { MoveLeft, MoveRight } from "lucide-react";

export const PaginationButton = ({
	previousButton,
	nextButton,
}: {
	previousButton: Omit<ButtonProps, "size" | "variant">;
	nextButton: Omit<ButtonProps, "size" | "variant">;
}) => {
	console.log(nextButton.disabled);

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
