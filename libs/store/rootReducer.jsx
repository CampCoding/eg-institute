import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import courseReducer from "../features/coursesSlice";
import MycourseReducer from "../features/coursesSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});
