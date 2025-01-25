import { Icon } from "@shared/components/icons/icons.tsx";

export const RepositoryPageHeader = ({ login }: { login: string }) => {
	return (
		<div className="flex gap-3 items-center ">
			<Icon.UserGraphic className={"size-[80px] lg:size-[60px]"} />
			<div className="flex flex-col justify-between h-full">
				<div className="text-h1 text-primary-black lg:text-p21 lg:font-bold">
					Welcome to {`<<${login}>>`} repositories👋
				</div>
				<div className="text-p21 text-grey-2 lg:text-p4 ">What are you up to today?</div>
			</div>
		</div>
	);
};
