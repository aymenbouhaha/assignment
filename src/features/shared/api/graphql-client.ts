import { ApolloClient, InMemoryCache } from "@apollo/client";

//TODO : Add env vars
export const client = new ApolloClient({
	uri: "https://api.github.com/graphql",
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer `,
	},
});
