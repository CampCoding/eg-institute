import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRoutes } from "../shared/routes";
import { _get } from "../shared/api";

const initialState = {
  all_Teachers_loading: false,
  all_Teachers_data: [],
};

export const handleGetAllTeachers = createAsyncThunk(
  "coursesSlice/GetAllTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _get(apiRoutes.get_teachers);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllTeachers.pending, (state) => {
        state.all_Teachers_loading = true;
      })
      .addCase(handleGetAllTeachers.fulfilled, (state, action) => {
        state.all_Teachers_loading = false;
        state.all_Teachers_data = action.payload;
      })
      .addCase(handleGetAllTeachers.rejected, (state) => {
        state.all_Teachers_loading = false;
      });
  },
});

export default teacherSlice.reducer;
