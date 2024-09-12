import { api } from "./index";

const getProductsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query({
			query: () => ({
				url: "/products",
			}),

			providesTags: ["PRODUCTS"],
		}),
		editProduct: build.mutation({
			query: ({ id, title, description, price }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: {
					title,
					description,
					price,
				},
			}),

			invalidatesTags: ["PRODUCTS"],
		}),
	}),
});

export const { useGetProductsQuery, useEditProductMutation } = getProductsApi;
