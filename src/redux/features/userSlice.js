import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const user = JSON.parse(localStorage.getItem("user"));

export const userLogin = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await api.userLogin(user);
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await api.userRegister(user);
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user ? user : null,
    error: "",
    success: false,
    loading: false,
  },
  reducers: {
    resetUser: (state) => {
      state.error = "";
      state.success = false;
      state.loading = false;
    },
    userLogout: (state) => {
      localStorage.removeItem("response");
      state.user = null;
    },
  },
  extraReducers: {
    //login
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    //register
    [userRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      //state.message = action.payload.message;
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = action.payload;
    },
  },
});

export const { resetUser, userLogout } = userSlice.actions;
export default userSlice.reducer;
