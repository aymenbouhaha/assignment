import { Repositories } from "@repositories/page/repositories.tsx";
import { Home } from "@home/pages/home";

export const AppRoutes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/repositories/:login",
		element: <Repositories />,
	},
];
