import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { removeToken } from "../store/slice/loginSlice";

const baseQuery = async (args, api, extraOptions) => {
	const { dispatch } = api;
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: "https://api.escuelajs.co/api/v1",
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

	const response = await rawBaseQuery(args, api, extraOptions);

	if (
		response.error &&
		(response.error.status === 403 || response.error.status === 401)
	) {
		dispatch(removeToken());
	}

	return response;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRetry,
	tagTypes: ["PRODUCTS"],
	endpoints: () => ({}),
});
