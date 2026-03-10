import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/libs/features/authSlice";
import courseReducer from "@/libs/features/coursesSlice";
import MycourseReducer from "@/libs/features/coursesSlice";
import meetingReducer from "@/libs/features/meetingSlice";
import { blogsSlice } from "@/libs/features/blogsSlice";
import { teacherSlice } from "../features/teacherSlice";
import profileReducer from '../features/profile';

export const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  meeting: meetingReducer,
  blogs: blogsSlice.reducer,
  teachers: teacherSlice.reducer,
  profile : profileReducer
});
