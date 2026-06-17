import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRoutes } from "../shared/routes";
import { _post } from "../shared/api";

const initialState = {
  all_reservations_list : [],
  all_reservations_loading : false,

  all_course_videos_list : [],
  all_course_videos_loading : false,

  all_course_quizes_list : [],
  all_course_quizes_loading : false,

  all_course_pdfs_list : [],
  all_course_pdfs_loading : false,
}

export const handleGetAllCourseVideos = createAsyncThunk("profileSlice/handleGetAllCourseVideos" , async({data}) => {
  const response = await _post(`/units/content/videos/select_course_videos.php` , data);
  return response;
})

export const handleGetAllCourseQuizs = createAsyncThunk("profileSlice/handleGetAllCourseQuizs" , async({data}) => {
  const response = await _post(`/units/content/quizes/select_course_quizes.php` , data);
  return response;
})

export const handleGetAllCoursePDFS = createAsyncThunk("profileSlice/handleGetAllCoursePDFS" , async({data}) => {
  const response = await _post(`/units/content/pdfs/select_course_pdfs.php` , data);
  return response;
})

export const handleGetAllMyReservations =  createAsyncThunk("profileSlice/handleGetAllMyReservations", async({data}) => {
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

    .addCase(handleGetAllCourseVideos.pending , (state) => {
      state.all_course_videos_loading = true;
    })
    .addCase(handleGetAllCourseVideos.fulfilled ,(state ,action) => {
      state.all_course_videos_loading = false;
      state.all_course_videos_list = action.payload;
    })
    .addCase(handleGetAllCourseVideos.rejected ,(state) => {
      state.all_course_videos_loading = false;
    })

    .addCase(handleGetAllCourseQuizs.pending , (state) => {
      state.all_course_quizes_loading = true;
    })
    .addCase(handleGetAllCourseQuizs.fulfilled ,(state ,action) => {
      state.all_course_quizes_loading = false;
      state.all_course_quizes_list = action.payload;
    })
    .addCase(handleGetAllCourseQuizs.rejected ,(state) => {
      state.all_course_quizes_loading = false;
    })

    .addCase(handleGetAllCoursePDFS.pending , (state) => {
      state.all_course_pdfs_loading = true;
    })
    .addCase(handleGetAllCoursePDFS.fulfilled ,(state ,action) => {
      state.all_course_pdfs_loading = false;
      state.all_course_pdfs_list = action.payload;
    })
    .addCase(handleGetAllCoursePDFS.rejected ,(state) => {
      state.all_course_pdfs_loading = false;
    })
  }
})

export default profileSlice.reducer;