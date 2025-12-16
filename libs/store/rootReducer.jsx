import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import courseReducer from "../features/coursesSlice";
import MycourseReducer from "../features/coursesSlice";
import meetingReducer from '../features/meetingSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  meeting: meetingReducer
});
