import { UseFormReturn } from "react-hook-form";
import { GithubLoginForm } from "@home/models/github-login-form.ts";
import { Icon } from "@shared/components/icons/icons.tsx";
import { ControlledSearchInput } from "@shared/components/inputs/controlled-search-input.tsx";
import { Button } from "@shared/components/ui";
import { FormProviderWrapper } from "@shared/components/inputs/form-provider-wrapper.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@shared/hooks/use-debounce.ts";
import { useLazyQuery } from "@apollo/client";
import { GetUsersQuery } from "@home/api/get-users-query.ts";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { UserModel } from "@home/models/user.model.ts";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useToast } from "@shared/hooks/use-toast.ts";
import { paginationDefaultValues, PaginationModel } from "@shared/models/pagination.model.ts";
import { UsersList } from "@home/components/users-list.tsx";

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
	const [cursor, setCursor] = useState<PaginationModel>(paginationDefaultValues);

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage: cursor.hasNextPage,
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
		setCursor(paginationDefaultValues);
		loadUsers().finally(() => setLoading(false));
	}, [debouncedSearch]);

	const { toast } = useToast();

	async function loadUsers() {
		try {
			const { data, error } = await getUsers({
				variables: { after: cursor.endCursor, query: `${debouncedSearch} in:login` },
			});
			if (error) {
				throw new Error(error.message);
			}
			if (data && !error) {
				const { pageInfo, nodes } = data.search;
				setUsers([...users, ...nodes.filter((item) => item.__typename === "User")]);
				setCursor(pageInfo);
			}
		} catch (e) {
			setOpen(false);
			toast({ variant: "destructive", title: "An error occurred fetching users" });
			console.log(e);
		}
	}

	return (
		<FormProviderWrapper
			form={form}
			onSubmit={onSubmit}
			className={
				"flex w-[400px] bg-[#fff] flex-col gap-9 items-center rounded-[14px] border border-grey-border p-4 md:mx-2"
			}
		>
			<div className="flex w-full flex-col items-center gap-[18px]">
				<Icon.UserGraphic />
				<div className="flex flex-col items-center gap-1">
					<div className="text-h1 text-secondary-black text-center">Welcome to Githubeautified</div>
					<div className="text-p21 text-primary-black text-center">Please enter the name of a github user</div>
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
						<UsersList
							users={users}
							loading={loading}
							cursor={cursor}
							onItemClick={(user) => {
								form.setValue("login", user.login);
								setOpen(false);
							}}
							infiniteRef={infiniteRef}
						/>
					}
				/>
			</div>
			<Button type={"submit"}>Confirm</Button>
		</FormProviderWrapper>
	);
};
