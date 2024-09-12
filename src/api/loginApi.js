import { api } from "./index";

const loginApi = api.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginUserMutation } = loginApi;
