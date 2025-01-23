import { Home } from "@/features/home";

export const AppRoutes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/repositories",
		element: <div>Repository</div>,
	},
];
