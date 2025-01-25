import { Dropdown } from "@shared/components/dropdown/dropdown.tsx";
import { ReactNode } from "react";
import { CustomIcon } from "@shared/components/icons/icons.tsx";
import { TextInput } from "@shared/components/inputs/text-input.tsx";

export const SearchInput = ({
	sheetContent,
	setOpen,
	open,
	placeholder,
	leadIcon,
	onSearchChange,
}: {
	placeholder: string;
	leadIcon?: {
		icon: CustomIcon;
		iconClassName?: string;
	};
	onSearchChange: (value: string) => void;
	sheetContent: ReactNode;
	setOpen: (value: boolean) => void;
	open: boolean;
}) => {
	return (
		<Dropdown
			setOpen={setOpen}
			open={open}
			trigger={<TextInput onValueChange={onSearchChange} placeholder={placeholder} leadIcon={leadIcon} />}
			content={sheetContent}
		/>
	);
};
