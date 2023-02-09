import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//import { login } from "./authServices";

const base_url = process.env.REACT_APP_BASE_URL;
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ values, toast, navigate }, { rejectWithValue }) => {
    //console.log("userData", values);
    try {
      const response = await axios.post(`${base_url}/auth/login`, values);
      //console.log("response", response);
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//login User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ values, toast, navigate }, { rejectWithValue }) => {
    //console.log("userData", values);
    try {
      const response = await axios.post(`${base_url}/auth/register`, values);
      //console.log("response", response);
      toast.success("Register successfully");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Logout user

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async ({ toast, navigate }, { rejectWithValue }) => {
    //console.log("userData", values);
    try {
      const response = await axios.get(`${base_url}/auth/logout`);
      //console.log("response", response);
      toast.success("Logout successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.removeItem("user");
      state.user = null;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
