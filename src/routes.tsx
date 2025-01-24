import { Home } from "@/features/home";
import { Repositories } from "@/features/repositories/page/repositories.tsx";

export const AppRoutes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/repositories",
		element: <Repositories />,
	},
];
