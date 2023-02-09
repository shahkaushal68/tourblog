import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;
//const user = JSON.parse(localStorage.getItem("user"));
//console.log("token", user?.token);

const initialState = {
  tour: {},
  tours: [],
  userTours: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//create Tour
export const addTour = createAsyncThunk(
  "tour/addTour",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    //console.log("tourData", formData);
    try {
      const response = await axios.post(`${base_url}/tour/add`, formData, {
        withCredentials: true,
      });
      //console.log("response", response);
      toast.success("Tour Added successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log("Add Tour error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Fetch All Tours
export const fetchAllTours = createAsyncThunk(
  "tour/fetchAllTours",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}/tour?page=${page}&limit=${limit}`
      );
      //console.log("response", response);
      return response.data;
    } catch (error) {
      //console.log("Add Tour error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Tour Likes
export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async (id, { rejectWithValue }) => {
    //console.log("id", id);
    try {
      const response = await axios.put(`${base_url}/tour/like/${id}`);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("Like Tour error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Fetch Single Tour
export const FetchSingleTour = createAsyncThunk(
  "tour/FetchSingleTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/tour/${id}`);
      //console.log("response", response);
      return response.data;
    } catch (error) {
      //console.log("Single Tour error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Fetch User's Tours
export const FetchUserTours = createAsyncThunk(
  "tour/FetchUserTours",
  async (userId, { rejectWithValue }) => {
    //console.log("slideId", userId);
    try {
      const response = await axios.get(`${base_url}/tour/user/${userId}`, {
        withCredentials: true,
      });
      //console.log("response", response);
      return response.data;
    } catch (error) {
      //console.log("User Tours error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//update Tour
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/tour/edit/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Tour Updated successfully");
      navigate("/");
      //console.log("response", response);
      return response.data;
    } catch (error) {
      //console.log("User Tours error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Delete Tour
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}/tour/delete/${id}`, {
        withCredentials: true,
      });
      //console.log("response", response);
      return response.data;
    } catch (error) {
      //console.log("User Tours error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTour.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addTour.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tours = [action.payload];
      state.isSuccess = true;
    });
    builder.addCase(addTour.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(fetchAllTours.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchAllTours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tours = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchAllTours.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(FetchSingleTour.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(FetchSingleTour.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tour = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(FetchSingleTour.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(FetchUserTours.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.userTours = [];
      state.isSuccess = false;
    });
    builder.addCase(FetchUserTours.fulfilled, (state, action) => {
      state.isLoading = false;
      //console.log("action", action);
      //console.log("payload", action.payload);
      state.userTours = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(FetchUserTours.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(updateTour.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateTour.fulfilled, (state, action) => {
      state.isLoading = false;
      const { arg } = action.meta;
      if (arg) {
        state.tours = state.tours.map((tour) =>
          tour._id === arg ? action.payload : tour
        );
        state.userTours = state.userTours.map((tour) =>
          tour._id === arg ? action.payload : tour
        );
      }

      state.isSuccess = true;
    });
    builder.addCase(updateTour.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(deleteTour.pending, (state) => {
      state.isLoading = true;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.isLoading = false;
      const { arg } = action.meta;
      if (arg) {
        state.userTours = state.userTours.filter((item) => item._id !== arg);
        state.tours = state.tours.filter((item) => item._id !== arg);
      }
      state.message = "Tour Deleted Successfully";
      state.isSuccess = true;
    });
    builder.addCase(deleteTour.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    });

    builder.addCase(likeTour.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likeTour.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { arg } = action.meta;
      // console.log("arg", arg);
      //console.log("action", action.payload);

      state.tours = state.tours.map((item) =>
        item._id === arg ? action.payload : item
      );
      //console.log("updateLike", updatedLike);
    });
    builder.addCase(likeTour.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default tourSlice.reducer;
