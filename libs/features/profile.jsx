import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRoutes } from "../shared/routes";
import { _post } from "../shared/api";

const initialState = {
  all_reservations_list : [],
  all_reservations_loading : false,
}

export const handleGetAllMyReservations =  createAsyncThunk("profileSlice/", async({data}) => {
  const response = await _post(`/meeting_resrvations/select_my_meeting.php`, data);
  return response;
})

export const profileSlice = createSlice({
  name:"profileSlice",
  initialState,
  extraReducers : (builder) => {
    builder
    .addCase(handleGetAllMyReservations.pending , (state) => {
      state.all_reservations_loading = true;
    })
    .addCase(handleGetAllMyReservations.fulfilled ,(state ,action) => {
      state.all_reservations_loading = false;
      state.all_reservations_list = action.payload;
    })
    .addCase(handleGetAllMyReservations.rejected ,(state) => {
      state.all_reservations_loading = false;
    })
  }
})

export default profileSlice.reducer;