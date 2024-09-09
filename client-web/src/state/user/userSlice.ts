import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export interface UserState {
  user: null | {
    username: string;
    email: string;
    id: string;
    access_token: string;
    refresh_token: string;
  };
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest: (
      state,
      _action: PayloadAction<{
        email: string;
        username: string;
        password: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<UserState["user"]>) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    loginRequest: (
      state,
      _action: PayloadAction<{ email: string; pass: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserState["user"]>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    getUserDataRequest: (state, _action: PayloadAction) => {
      state.loading = true;
      state.error = null;
    },
    getUserDataSuccess: (state, action: PayloadAction<UserState["user"]>) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      toast.success("Logged out successfully!");
    },
    updateRequest: (
      state,
      _action: PayloadAction<{ id: string | undefined; username: string }>
    ) => {
      (state.loading = false), (state.error = null);
    },
    updateSuccess: (state, action: PayloadAction<UserState["user"]>) => {
      state.loading = false;
      state.user = action.payload;
      toast.success("Username updated successfully");
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginFailure,
  loginSuccess,
  getUserDataFailure,
  getUserDataRequest,
  getUserDataSuccess,
  logout,
  updateFailure,
  updateRequest,
  updateSuccess,
} = userSlice.actions;

export default userSlice.reducer;
