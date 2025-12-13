import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  all_courses_loading: false,
  all_courses_data: [],

  my_courses_loading: false,
  my_courses_data: [],
};

export const handleGetAllCourses = createAsyncThunk(
  "coursesSlice/handleGetAllCourses",
  async () => {
    try {
      const response = await _get(apiRoutes.get_courses);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const handleGetMyCourses = createAsyncThunk(
  "coursesSlice/handleGetMyCourses",
  async ({ data }) => {
    try {
      const response = await _post(apiRoutes.get_Mycourses, data);
      return response.data.message;
    } catch (err) {
      return err;
    }
  }
);

export const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllCourses.pending, (state) => {
        state.all_courses_loading = true;
      })
      .addCase(handleGetAllCourses.fulfilled, (state, action) => {
        state.all_courses_loading = false;
        state.all_courses_data = action.payload;
      })
      .addCase(handleGetAllCourses.rejected, (state) => {
        state.all_courses_loading = false;
      })
      .addCase(handleGetMyCourses.pending, (state) => {
        state.my_courses_loading = true;
      })
      .addCase(handleGetMyCourses.fulfilled, (state, action) => {
        state.my_courses_loading = false;
        state.my_courses_data = action.payload;
      })
      .addCase(handleGetMyCourses.rejected, (state) => {
        state.my_courses_loading = false;
      });
  },
});

export default coursesSlice.reducer;
