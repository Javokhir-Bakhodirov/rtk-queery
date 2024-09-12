import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem("token") || null,
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		removeToken: (state) => {
			state.token = null;
			localStorage.removeItem("token");
		},
	},
});

export const { setToken, removeToken } = loginSlice.actions;
export default loginSlice.reducer;
