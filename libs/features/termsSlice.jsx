import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  terms_loading: false,
  terms_data: [],
  terms_error: null,
};

export const handleGetTerms = createAsyncThunk(
  "termsSlice/handleGetTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _get(apiRoutes.get_terms);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const termsSlice = createSlice({
  name: "termsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetTerms.pending, (state) => {
        state.terms_loading = true;
        state.terms_error = null;
      })
      .addCase(handleGetTerms.fulfilled, (state, action) => {
        state.terms_loading = false;
        state.terms_data = action.payload?.message ?? action.payload ?? [];
      })
      .addCase(handleGetTerms.rejected, (state, action) => {
        state.terms_loading = false;
        state.terms_error = action.payload || "Failed to load terms";
      });
  },
});

export default termsSlice.reducer;
