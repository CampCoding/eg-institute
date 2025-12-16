import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  all_courses_loading: false,
  all_courses_data: [],

  my_courses_loading: false,
  my_courses_data: [],

  course_teacher_data: [],
  course_teacher_loading: false,

  course_teacher_group_data: [],
  course_teacher_group_loading: false,

  course_student_shedule_data: [],
  course_student_shedule_loading: false,

  make_schedule_loading: false,
  make_schedule_data: null,
  make_schedule_error: null,
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

export const handleGetAllCourseTeachers = createAsyncThunk(
  "coursesSlice/handleGetAllCourseTeachers",
  async ({ data }) => {
    const response = await _post("teachers/select_course_teachers.php", data);
    return response;
  }
);

export const handleGetAllCourseTeacherGroups = createAsyncThunk(
  "coursesSlice/handleGetAllCourseTeacherGroups",
  async ({ data }) => {
    const response = await _post("groups/select_teacher_groups.php", data);
    return response;
  }
);

export const handleGetAllStudentSchedules = createAsyncThunk(
  "coursesSlice/handleGetAllStudentSchedules",
  async ({ data }) => {
    const response = await _post("courses/student_schedule.php", data);
    return response;
  }
);

export const handleMakeStudentSchedule = createAsyncThunk(
  "coursesSlice/handleMakeStudentSchedule",
  async ({ data }) => {
    const response = await _post(
      "subscreptions/make_student_subscreption.php",
      data
    );
    return response;
  }
);

export const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  reducers: {},
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
      })

      .addCase(handleGetAllCourseTeachers.pending, (state) => {
        state.course_teacher_loading = true;
      })
      .addCase(handleGetAllCourseTeachers.fulfilled, (state, action) => {
        state.course_teacher_loading = false;
        state.course_teacher_data = action.payload;
      })
      .addCase(handleGetAllCourseTeachers.rejected, (state) => {
        state.course_teacher_loading = false;
      })

      .addCase(handleGetAllCourseTeacherGroups.pending, (state) => {
        state.course_teacher_group_loading = true;
      })
      .addCase(handleGetAllCourseTeacherGroups.fulfilled, (state, action) => {
        state.course_teacher_group_loading = false;
        state.course_teacher_group_data = action.payload;
      })
      .addCase(handleGetAllCourseTeacherGroups.rejected, (state) => {
        state.course_teacher_group_loading = false;
      })

      .addCase(handleGetAllStudentSchedules.pending, (state) => {
        state.course_student_shedule_loading = true;
      })
      .addCase(handleGetAllStudentSchedules.fulfilled, (state, action) => {
        state.course_student_shedule_loading = false;
        state.course_student_shedule_data = action.payload;
      })
      .addCase(handleGetAllStudentSchedules.rejected, (state) => {
        state.course_student_shedule_loading = false;
      })

      .addCase(handleMakeStudentSchedule.pending, (state) => {
        state.make_schedule_loading = true;
        state.make_schedule_error = null;
        state.make_schedule_data = null;
      })
      .addCase(handleMakeStudentSchedule.fulfilled, (state, action) => {
        state.make_schedule_loading = false;
        state.make_schedule_data = action.payload;
      })
      .addCase(handleMakeStudentSchedule.rejected, (state, action) => {
        state.make_schedule_loading = false;
        state.make_schedule_error = action?.error?.message || "Subscription failed";
      });
  },
});

export default coursesSlice.reducer;
