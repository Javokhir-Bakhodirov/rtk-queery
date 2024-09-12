import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const Login = lazy(() => import("./login/Login"));
const Products = lazy(() => import("./products/Products"));

const RouteController = () => {
	return useRoutes([
		{
			path: "/login",
			element: (
				<Suspense fallback={<Loading />}>
					<Login />
				</Suspense>
			),
		},
		{
			path: "/",
			element: (
				<Suspense fallback={<Loading />}>
					<Products />
				</Suspense>
			),
		},

		{ path: "/loading", element: <Loading /> },
	]);
};

export default RouteController;
