import { UseFormReturn } from "react-hook-form";
import { GithubLoginForm } from "@home/models/github-login-form.ts";
import { Icon } from "@shared/components/icons/icons.tsx";
import { ControlledSearchInput } from "@shared/components/inputs/controlled-search-input.tsx";
import { Loader } from "@shared/components/loaders/loader.tsx";
import { SearchResultItem } from "@shared/components/others/search-result.tsx";
import { Button } from "@shared/components/ui";
import { FormProviderWrapper } from "@shared/components/inputs/form-provider-wrapper.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@shared/hooks/use-debounce.ts";
import { useLazyQuery } from "@apollo/client";
import { GetUsersQuery } from "@home/api/get-users-query.ts";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { UserModel } from "@home/models/user.model.ts";
import { ThreeDotsLoader } from "@shared/components/loaders/three-dots-loader.tsx";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const WelcomeCard = ({
	form,
	onSubmit,
}: {
	form: UseFormReturn<GithubLoginForm>;
	onSubmit: (value: GithubLoginForm) => void;
}) => {
	const [search, setSearch] = useState<string>("");
	const debouncedSearch = useDebounce<string>(search, 500);

	const [open, setOpen] = useState<boolean>(false);

	const [getUsers] = useLazyQuery<SearchQueryResultModel<UserModel>>(GetUsersQuery, {
		fetchPolicy: "network-only",
	});
	const [users, setUsers] = useState<UserModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [after, setAfter] = useState<string | null>();
	const [hasNextPage, setHasNextPage] = useState(false);

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: loadUsers,
		disabled: false,
	});

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		if (!value) {
			setOpen(false);
			return;
		}
		setOpen(true);
		setLoading(true);
		setUsers([]);
	};

	useEffect(() => {
		setAfter(null);
		setHasNextPage(false);
		loadUsers().finally(() => setLoading(false));
	}, [debouncedSearch]);

	async function loadUsers() {
		try {
			const { data, error } = await getUsers({ variables: { after: after, query: `${debouncedSearch} in:login` } });
			if (data && !error) {
				setUsers([...users, ...data.search.nodes.filter((item) => item.__typename === "User")]);
				setAfter(data.search.pageInfo.endCursor);
				setHasNextPage(data.search.pageInfo.hasNextPage);
			}
		} catch (e) {
			console.log(e);
		}
	}

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
							) : users.length ? (
								<>
									{users.map((item) => (
										<SearchResultItem
											key={`user.${item.id}`}
											onClick={() => {
												form.setValue("login", item.login);
												setOpen(false);
											}}
											image={item.avatarUrl}
											text={item.login}
										/>
									))}
									{hasNextPage && (
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
			</div>
			<Button type={"submit"}>Confirm</Button>
		</FormProviderWrapper>
	);
};
