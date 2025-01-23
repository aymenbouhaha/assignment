import { gql } from "@apollo/client";

export const GetUsersQuery = gql`
	query GET_USERS($query: String!, $after: String) {
		search(type: USER, query: $query, first: 25, after: $after) {
			nodes {
				... on User {
					login
					email
					id
					avatarUrl
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;
