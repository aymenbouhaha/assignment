import { gql } from "@apollo/client";

export const GetRepositoriesQuery = gql`
	query GET_REPOSITORIES($query: String!, $after: String, $before: String, $first: Int, $last: Int) {
		search(type: REPOSITORY, query: $query, first: $first, last: $last, after: $after, before: $before) {
			nodes {
				... on Repository {
					id
					name
					description
					url
					parent {
						nameWithOwner
						url
					}
					licenseInfo {
						name
					}
					primaryLanguage {
						color
						name
						id
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`;
