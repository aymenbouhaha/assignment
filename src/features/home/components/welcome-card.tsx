import { Icon } from "@shared/components/icons/icons.tsx";
import { Item, SearchInput } from "@shared/components/inputs/search-input.tsx";
import { useLazyQuery } from "@apollo/client";
import { GetUsersQuery } from "@home/api/get-users-query.ts";
import { SearchQueryResultModel } from "@shared/models/search-query-result.model.ts";
import { UserModel } from "@home/models/user.model.ts";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PaginationModel } from "@shared/models/pagination.model.ts";

/**
 * The `WelcomeCard` component displays a welcoming card for the application,
 * allowing users to search for GitHub users by their username.
 *
 * @component
 * @returns {React.JSX} The rendered welcome card component.
 *
 * @example
 * <WelcomeCard />
 */
export const WelcomeCard = (): React.JSX.Element => {
	const [getUsers] = useLazyQuery<SearchQueryResultModel<UserModel>>(GetUsersQuery, {
		fetchPolicy: "network-only",
	});

	const navigate = useNavigate();

	/**
	 * Fetches a list of GitHub users based on the input search query.
	 *
	 * @async
	 * @function
	 * @param {Object} params - Parameters for the query.
	 * @param {string | null} params.after - Cursor for pagination.
	 * @param {string } [params.search] - Search query for filtering GitHub users.
	 * @returns {Promise<{ items: { placeholder: string; image: string; value: string }[], cursor: PaginationModel } | undefined>}
	 * Resolves to a list of user items with their metadata and pagination info, or `undefined` if no data is available.
	 *
	 * @throws {Error} Throws an error if the query fails.
	 */
	const loadUsers = async ({
		after,
		search,
	}: {
		after: string | null;
		search?: string;
	}): Promise<{ items: Item[]; cursor: PaginationModel } | undefined> => {
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
						navigate(`/repositories/${item.placeholder}`);
					}}
				/>
			</div>
		</div>
	);
};
