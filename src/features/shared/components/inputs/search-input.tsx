import { Dropdown } from "@shared/components/dropdown/dropdown.tsx";
import React, { useEffect, useState } from "react";
import { CustomIcon } from "@shared/components/icons/icons.tsx";
import { TextInput } from "@shared/components/inputs/text-input.tsx";
import { Loader } from "@shared/components/loaders/loader.tsx";
import { SearchResultItem } from "@shared/components/others/search-result.tsx";
import { ThreeDotsLoader } from "@shared/components/loaders/three-dots-loader.tsx";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { paginationDefaultValues, PaginationModel } from "@shared/models/pagination.model.ts";
import { useToast } from "@shared/hooks/use-toast.ts";
import { useDebounce } from "@shared/hooks/use-debounce.ts";

export type Item = {
	image?: string;
	value: string;
	placeholder: string;
};

type SearchInputProps = {
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		iconClassName?: string;
	};
	getDropdownItems: (param: {
		after: string | null;
		search?: string;
	}) => Promise<{ items: Item[]; cursor: PaginationModel } | undefined>;
	errorMessage?: string;
	onItemSelected: (item: Item) => void;
};

/**
 * The `SearchInput` component provides a searchable input field with dropdown functionality.
 * It supports infinite scrolling, debounced searches, and dynamic item fetching.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {Object} [props.leadIcon] - Optional leading icon configuration.
 * @param {CustomIcon} props.leadIcon.icon - The leading icon component.
 * @param {string} [props.leadIcon.iconClassName] - Additional class names for the leading icon.
 * @param {function} props.getDropdownItems - A function to fetch dropdown items asynchronously.
 * @param {string} [props.errorMessage] - The error message to display on fetch failure.
 * @param {function} props.onItemSelected - Callback invoked when an item is selected from the dropdown.
 * @returns {React.JSX} The rendered `SearchInput` component.
 *
 * @example
 * <SearchInput
 *   placeholder="Search users"
 *   leadIcon={{ icon: ProfileIcon, iconClassName: "text-gray-500" }}
 *   getDropdownItems={fetchUsers}
 *   errorMessage="Failed to fetch users"
 *   onItemSelected={(item) => console.log(item)}
 * />
 */
export const SearchInput = ({
	placeholder,
	leadIcon,
	getDropdownItems,
	errorMessage,
	onItemSelected,
}: SearchInputProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce<string>(search, 500);

	const { toast } = useToast();

	const [items, setItems] = useState<Item[]>([]);
	const [cursor, setCursor] = useState<PaginationModel>(paginationDefaultValues);

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage: true,
		onLoadMore: loadItems,
		disabled: false,
	});

	const onSearchChange = (value: string) => {
		setSearch(value);
		setItems([]);
		if (!value) {
			setOpen(false);
			return;
		}
		setLoading(true);
		setOpen(true);
		setCursor(paginationDefaultValues);
	};

	useEffect(() => {
		if (!debouncedSearch) return;
		loadItems().finally(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch]);

	/**
	 * Fetches items for the dropdown based on the current search and cursor.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>} Resolves when the items are fetched and state is updated.
	 */
	async function loadItems(): Promise<void> {
		try {
			const result = await getDropdownItems({ after: cursor.endCursor, search: debouncedSearch });
			if (result) {
				const { items, cursor: pageInfo } = result as { items: Item[]; cursor: PaginationModel };
				setItems((prev) => [...prev, ...items]);
				setCursor(pageInfo);
			}
		} catch (e) {
			setOpen(false);
			toast({ variant: "destructive", title: errorMessage ?? "An error occurred, please try later" });
			console.log(e);
		}
	}

	return (
		<Dropdown
			setOpen={setOpen}
			open={open}
			trigger={<TextInput onValueChange={onSearchChange} placeholder={placeholder} leadIcon={leadIcon} />}
			content={
				<>
					{loading ? (
						<div className={"w-full h-[100px] flex justify-center items-center"}>
							<Loader />
						</div>
					) : items.length ? (
						<>
							{items.map((item) => (
								<SearchResultItem
									key={`user.${item.value}`}
									image={item.image}
									text={item.placeholder}
									onClick={() => {
										onItemSelected(item);
									}}
								/>
							))}
							{infiniteRef && cursor?.hasNextPage && (
								<div ref={infiniteRef}>
									<ThreeDotsLoader wrapperClass="flex justify-center" />
								</div>
							)}
						</>
					) : (
						<div className="w-full h-[100px] flex justify-center items-center text-primary-black text-p2">
							No items found
						</div>
					)}
				</>
			}
		/>
	);
};
