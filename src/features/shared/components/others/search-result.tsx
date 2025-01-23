import { cn } from "@/lib/utils";

type SearchResultItemProps = {
	onClick: () => void;
	text: string;
	image?: string;
};

export const SearchResultItem = ({ onClick, text, image }: SearchResultItemProps) => {
	return (
		<div
			tabIndex={1}
			className={cn("px-3 flex gap-2 items-center hover:bg-grey-border cursor-pointer", {
				"py-2 ": image,
				"py-3.5": !image,
			})}
			onClick={onClick}
		>
			{image && <img src={image} alt="result" className={cn("rounded-[50%] size-5")} />}
			<div className="text-primary-black text-p3">{text}</div>
		</div>
	);
};
