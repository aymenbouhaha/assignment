import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "@shared/api/graphql-client.ts";
import { Toaster } from "@shared/components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
	<ApolloProvider client={client}>
		<App />
		<Toaster />
	</ApolloProvider>,
);
