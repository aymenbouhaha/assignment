import { Dropdown } from "@shared/components/dropdown/dropdown.tsx";
import { useEffect, useState } from "react";
import { CustomIcon } from "@shared/components/icons/icons.tsx";
import { TextInput } from "@shared/components/inputs/text-input.tsx";
import { Loader } from "@shared/components/loaders/loader.tsx";
import { SearchResultItem } from "@shared/components/others/search-result.tsx";
import { ThreeDotsLoader } from "@shared/components/loaders/three-dots-loader.tsx";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { paginationDefaultValues, PaginationModel } from "@shared/models/pagination.model.ts";
import { useToast } from "@shared/hooks/use-toast.ts";
import { useDebounce } from "@shared/hooks/use-debounce.ts";

export type Items = {
	image?: string;
	value: string;
	placeholder: string;
};

export const SearchInput = ({
	placeholder,
	leadIcon,
	getDropdownItems,
	errorMessage,
}: {
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		iconClassName?: string;
	};
	getDropdownItems: (param: {
		after: string | null;
		search?: string;
	}) => Promise<{ items: Items[]; cursor: PaginationModel } | undefined>;
	errorMessage?: string;
}) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce<string>(search, 500);

	const { toast } = useToast();

	const [items, setItems] = useState<Items[]>([]);
	const [cursor, setCursor] = useState<PaginationModel>(paginationDefaultValues);

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage: true,
		onLoadMore: loadItems,
		disabled: false,
	});

	const onSearchChange = (value: string) => {
		setSearch(value);
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
	}, [debouncedSearch]);

	async function loadItems() {
		try {
			const result = await getDropdownItems({ after: cursor.endCursor, search: debouncedSearch });
			if (result) {
				const { items, cursor: pageInfo } = result as { items: Items[]; cursor: PaginationModel };
				setItems((prev) => [...prev, ...items]);
				setCursor(pageInfo);
			}
		} catch (e) {
			setOpen(false);
			toast({ variant: "destructive", title: errorMessage });
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
								<SearchResultItem key={`user.${item.value}`} image={item.image} text={item.placeholder} />
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
