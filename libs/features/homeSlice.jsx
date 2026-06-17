import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  home_loading: false,
  home_data: null,
  home_error: null,
};

export const handleGetHomePage = createAsyncThunk(
  "homeSlice/handleGetHomePage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _get(apiRoutes.get_home);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetHomePage.pending, (state) => {
        state.home_loading = true;
        state.home_error = null;
      })
      .addCase(handleGetHomePage.fulfilled, (state, action) => {
        state.home_loading = false;
        state.home_data = action.payload;
      })
      .addCase(handleGetHomePage.rejected, (state, action) => {
        state.home_loading = false;
        state.home_error = action.payload || "Failed to load home data";
      });
  },
});

export default homeSlice.reducer;
