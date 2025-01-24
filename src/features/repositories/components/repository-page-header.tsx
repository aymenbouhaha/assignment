import { Icon } from "@shared/components/icons/icons.tsx";

export const RepositoryPageHeader = () => {
	return (
		<div className="flex gap-3 items-center ">
			<Icon.UserGraphic className={"size-[80px]"} />
			<div className="flex flex-col justify-between h-full">
				<div className="text-h1 text-primary-black">Welcome back, Aymen Bouhaha! 👋</div>
				<div className="text-p21 text-grey-2">What are you up to today?</div>
			</div>
		</div>
	);
};
