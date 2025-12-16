import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  all_reserved_meetings_list : [],
  all_reserved_meetings_loading: false,

  reserve_meeting_loading : false,
}

export const handleGetAllReservedMeeting = createAsyncThunk("meetingSlice/handleGetAllReservedMeeting",async() => {
  const response = await  _get("meeting_resrvations/select_meeting_resrvations.php");
  return response;
})

export const handleReserveMeeting = createAsyncThunk("meetingSlice/handleReserveMeeting",async({data}) => {
  const response = await _post("meeting_resrvations/resrve_meeting.php",data);
  return response;
})

export const meetingSlice = createSlice({
  name:"meetingSlice",
  initialState,
  extraReducers:(builder) => {
    builder
    .addCase(handleGetAllReservedMeeting.pending ,(state) => {
      state.all_reserved_meetings_loading = true;
    })
    .addCase(handleGetAllReservedMeeting.fulfilled ,(state , action) => {
      state.all_reserved_meetings_loading = false;
      state.all_reserved_meetings_list = action.payload;
    })
    .addCase(handleGetAllReservedMeeting.rejected ,(state) => {
      state.all_reserved_meetings_loading = false;
    })

    .addCase(handleReserveMeeting.pending ,(state) => {
      state.reserve_meeting_loading = true;
    })
    .addCase(handleReserveMeeting.fulfilled ,(state , action) => {
      state.reserve_meeting_loading = false;
    })
    .addCase(handleReserveMeeting.rejected ,(state) => {
      state.reserve_meeting_loading = false;
    })
  }
})

export default meetingSlice.reducer;