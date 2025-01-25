import { Icon } from "@shared/components/icons/icons.tsx";
import { SearchInput } from "@shared/components/inputs/search-input.tsx";
import { useLazyQuery } from "@apollo/client";
import { GetUsersQuery } from "@home/api/get-users-query.ts";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { UserModel } from "@home/models/user.model.ts";
import { useNavigate } from "react-router-dom";

export const WelcomeCard = () => {
	const [getUsers] = useLazyQuery<SearchQueryResultModel<UserModel>>(GetUsersQuery, {
		fetchPolicy: "network-only",
	});

	const navigate = useNavigate();

	const loadUsers = async ({ after, search }: { after: string | null; search?: string }) => {
		const { data, error } = await getUsers({
			variables: { after, query: `${search} in:login` },
		});
		if (error) {
			throw new Error(error.message);
		}
		if (data) {
			const { pageInfo, nodes } = data.search;
			const users = nodes
				.filter((item) => item.__typename === "User")
				.map((item) => ({ placeholder: item.login, image: item.avatarUrl, value: item.id }));
			return {
				items: users,
				cursor: pageInfo,
			};
		} else {
			return undefined;
		}
	};

	return (
		<div
			className={
				"flex w-[400px] bg-[#fff] flex-col gap-9 items-center rounded-[14px] border border-grey-2/50 p-4 md:mx-2"
			}
		>
			<div className="flex w-full flex-col items-center gap-[18px]">
				<Icon.UserGraphic />
				<div className="flex flex-col items-center gap-1">
					<div className="text-h1 text-secondary-black text-center">Welcome to Githubeautified</div>
					<div className="text-p21 text-primary-black text-center">Please enter the name of a github user</div>
				</div>
				<SearchInput
					placeholder={"Github user name"}
					leadIcon={{
						icon: "Profile",
						iconClassName: "stroke-grey-2",
					}}
					getDropdownItems={loadUsers}
					errorMessage={"An error occurred fetching users"}
					onItemSelected={(item) => {
						console.log("Hello");
						navigate(`/repositories/${item.placeholder}`);
					}}
				/>
			</div>
		</div>
	);
};
