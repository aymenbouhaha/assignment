import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "@/routes.tsx";

function App() {
	return <RouterProvider router={createBrowserRouter(AppRoutes)} />;
}

export default App;
