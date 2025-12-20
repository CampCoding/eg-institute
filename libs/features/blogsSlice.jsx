import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  all_blogs_loading: false,
  all_blogs_data: [],
};

export const handleGetAllBlogs = createAsyncThunk(
  "blogsSlice/handleGetAllBlogs",
  async () => {
    try {
      const response = await _get(apiRoutes.get_blogs);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllBlogs.pending, (state) => {
        state.all_blogs_loading = true;
      })
      .addCase(handleGetAllBlogs.fulfilled, (state, action) => {
        state.all_blogs_loading = false;
        state.all_blogs_data = action.payload;
      })
      .addCase(handleGetAllBlogs.rejected, (state) => {
        state.all_blogs_loading = false;
      });
  },
});

export default blogsSlice.reducer;
