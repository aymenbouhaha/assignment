import { Button } from "@shared/components/ui";

export const ErrorComponent = ({ message = "Something went wrong. Please try again later." }: { message?: string }) => {
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
