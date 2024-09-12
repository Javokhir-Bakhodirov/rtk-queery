import { configureStore } from "@reduxjs/toolkit";
import currentProductsSlice from "./slice/productsSlice";
import { api } from "../api";

const store = configureStore({
	reducer: {
		products: currentProductsSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;
