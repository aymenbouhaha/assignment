import { UseFormReturn } from "react-hook-form";
import { GithubLoginForm } from "@home/models/github-login-form.ts";
import { Icon } from "@shared/components/icons/icons.tsx";
import { ControlledSearchInput } from "@shared/components/inputs/controlled-search-input.tsx";
import { Loader } from "@shared/components/others/loader.tsx";
import { SearchResultItem } from "@shared/components/others/search-result.tsx";
import TestImage from "@/assets/test.png";
import { Button } from "@shared/components/ui";
import { FormProviderWrapper } from "@shared/components/inputs/form-provider-wrapper.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@shared/hooks/use-debounce.ts";

const users = ["aymen", "ahmed", "ahymen", "test", "test 23", "test145"];

export const WelcomeCard = ({
	form,
	onSubmit,
}: {
	form: UseFormReturn<GithubLoginForm>;
	onSubmit: (value: GithubLoginForm) => void;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [filteredUser, setFilteredUsers] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState<string>("");
	const debouncedSearch = useDebounce<string>(search, 200);

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!value) {
			setOpen(false);
			return;
		}
		setLoading(true);
		setOpen(true);
		setSearch(value);
	};

	useEffect(() => {
		setFilteredUsers(users.filter((item) => item.includes(debouncedSearch)));
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, [debouncedSearch]);

	return (
		<FormProviderWrapper
			form={form}
			onSubmit={onSubmit}
			className={"flex w-[400px] bg-[#fff] flex-col gap-9 items-center rounded-[14px] border border-grey-border p-4"}
		>
			<div className="flex w-full flex-col items-center gap-[18px]">
				<Icon.UserGraphic />
				<div className="flex flex-col items-center gap-1">
					<div className="text-h1 text-secondary-black">Welcome to Githubeautified</div>
					<div className="text-p21 text-primary-black ">Please enter the name of a github user</div>
				</div>
				<ControlledSearchInput
					onSearchChange={onSearchChange}
					placeholder={"Github user name"}
					fieldName={"login"}
					leadIcon={{
						icon: "Profile",
						iconClassName: "stroke-grey-2",
					}}
					open={open}
					setOpen={setOpen}
					sheetContent={
						<>
							{loading ? (
								<div className={"w-full h-[100px] flex justify-center items-center"}>
									<Loader />
								</div>
							) : filteredUser.length ? (
								filteredUser.map((item, index) => (
									<SearchResultItem
										key={`user.${item}.${index}`}
										onClick={() => {
											form.setValue("login", item);
											setOpen(false);
										}}
										image={TestImage}
										text={item}
									/>
								))
							) : (
								<div className="w-full h-[100px] flex justify-center items-center text-primary-black text-p2">
									No items found
								</div>
							)}
						</>
					}
				/>
			</div>
			<Button type={"submit"}>Confirm</Button>
		</FormProviderWrapper>
	);
};
