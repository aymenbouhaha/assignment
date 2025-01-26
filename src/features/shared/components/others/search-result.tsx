import { cn } from "@/lib/utils";
import React from "react";

type SearchResultItemProps = {
	onClick?: () => void;
	text: string;
	image?: string;
};

/**
 * The `SearchResultItem` component represents an individual item in a search result dropdown or list.
 * It can display an optional image alongside a text label and is clickable to trigger an action.
 *
 * @component
 * @example
 * ```tsx
 * <SearchResultItem
 *   text="GitHub User"
 *   image="https://example.com/avatar.png"
 *   onClick={() => console.log("Item clicked")}
 * />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to display for the search result item.
 * @param {string} [props.image] - Optional image URL to display next to the text.
 * @param {() => void} [props.onClick] - Optional callback function triggered when the item is clicked.
 *
 * @returns {React.JSX} The rendered search result item component.
 */
export const SearchResultItem = ({ onClick, text, image }: SearchResultItemProps): React.JSX.Element => {
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
