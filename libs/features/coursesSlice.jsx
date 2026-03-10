import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
  // All courses
  all_courses_loading: false,
  all_courses_data: [],
  all_courses_error: null,

  // My enrolled courses
  my_courses_loading: false,
  my_courses_data: [],
  my_courses_error: null,

  // Course teachers
  course_teacher_data: [],
  course_teacher_loading: false,
  course_teacher_error: null,

  // Course teacher groups
  course_teacher_group_data: [],
  course_teacher_group_loading: false,
  course_teacher_group_error: null,

  // Student schedules
  course_student_shedule_data: [],
  course_student_shedule_loading: false,
  course_student_shedule_error: null,

  // Make schedule
  make_schedule_loading: false,
  make_schedule_data: null,
  make_schedule_error: null,

  // Course videos (with units inside)
  course_videos_data: null,
  course_videos_loading: false,
  course_videos_error: null,

  // Quizzes
  quizzes_data: [],
  quizzes_loading: false,
  quizzes_error: null,
};

// Get all courses
export const handleGetAllCourses = createAsyncThunk(
  "coursesSlice/handleGetAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _get(apiRoutes.get_courses);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get my enrolled courses
export const handleGetMyCourses = createAsyncThunk(
  "coursesSlice/handleGetMyCourses",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(apiRoutes.get_Mycourses, data);
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get course teachers
export const handleGetAllCourseTeachers = createAsyncThunk(
  "coursesSlice/handleGetAllCourseTeachers",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post("teachers/select_course_teachers.php", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get teacher groups
export const handleGetAllCourseTeacherGroups = createAsyncThunk(
  "coursesSlice/handleGetAllCourseTeacherGroups",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post("groups/select_teacher_groups.php", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get student schedules
export const handleGetAllStudentSchedules = createAsyncThunk(
  "coursesSlice/handleGetAllStudentSchedules",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post("courses/student_schedule.php", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get course videos with units
export const handleGetCourseVideos = createAsyncThunk(
  "coursesSlice/handleGetCourseVideos",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(
        "units/content/videos/select_course_videos.php",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get quizzes
export const handleGetQuizzes = createAsyncThunk(
  "coursesSlice/handleGetQuizzes",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(apiRoutes.get_quizzes, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Make student schedule/subscription
export const handleMakeStudentSchedule = createAsyncThunk(
  "coursesSlice/handleMakeStudentSchedule",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(
        "subscreptions/make_student_subscreption.php",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  reducers: {
    clearCourseVideos: (state) => {
      state.course_videos_data = null;
      state.course_videos_error = null;
    },
    clearMyCourses: (state) => {
      state.my_courses_data = [];
      state.my_courses_error = null;
    },
    clearScheduleData: (state) => {
      state.make_schedule_data = null;
      state.make_schedule_error = null;
    },
    resetCourseState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET ALL COURSES
      .addCase(handleGetAllCourses.pending, (state) => {
        state.all_courses_loading = true;
        state.all_courses_error = null;
      })
      .addCase(handleGetAllCourses.fulfilled, (state, action) => {
        state.all_courses_loading = false;
        state.all_courses_data = action.payload;
      })
      .addCase(handleGetAllCourses.rejected, (state, action) => {
        state.all_courses_loading = false;
        state.all_courses_error = action.payload || "Failed to load courses";
      })

      // GET MY COURSES
      .addCase(handleGetMyCourses.pending, (state) => {
        state.my_courses_loading = true;
        state.my_courses_error = null;
      })
      .addCase(handleGetMyCourses.fulfilled, (state, action) => {
        state.my_courses_loading = false;
        state.my_courses_data = action.payload;
      })
      .addCase(handleGetMyCourses.rejected, (state, action) => {
        state.my_courses_loading = false;
        state.my_courses_error = action.payload || "Failed to load my courses";
      })

      // GET COURSE TEACHERS
      .addCase(handleGetAllCourseTeachers.pending, (state) => {
        state.course_teacher_loading = true;
        state.course_teacher_error = null;
      })
      .addCase(handleGetAllCourseTeachers.fulfilled, (state, action) => {
        state.course_teacher_loading = false;
        state.course_teacher_data = action.payload;
      })
      .addCase(handleGetAllCourseTeachers.rejected, (state, action) => {
        state.course_teacher_loading = false;
        state.course_teacher_error =
          action.payload || "Failed to load teachers";
      })

      // GET TEACHER GROUPS
      .addCase(handleGetAllCourseTeacherGroups.pending, (state) => {
        state.course_teacher_group_loading = true;
        state.course_teacher_group_error = null;
      })
      .addCase(handleGetAllCourseTeacherGroups.fulfilled, (state, action) => {
        state.course_teacher_group_loading = false;
        state.course_teacher_group_data = action.payload;
      })
      .addCase(handleGetAllCourseTeacherGroups.rejected, (state, action) => {
        state.course_teacher_group_loading = false;
        state.course_teacher_group_error =
          action.payload || "Failed to load groups";
      })

      // GET STUDENT SCHEDULES
      .addCase(handleGetAllStudentSchedules.pending, (state) => {
        state.course_student_shedule_loading = true;
        state.course_student_shedule_error = null;
      })
      .addCase(handleGetAllStudentSchedules.fulfilled, (state, action) => {
        state.course_student_shedule_loading = false;
        state.course_student_shedule_data = action.payload;
      })
      .addCase(handleGetAllStudentSchedules.rejected, (state, action) => {
        state.course_student_shedule_loading = false;
        state.course_student_shedule_error =
          action.payload || "Failed to load schedules";
      })

      // MAKE STUDENT SCHEDULE
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
        state.make_schedule_error = action.payload || "Subscription failed";
      })

      // GET COURSE VIDEOS
      .addCase(handleGetCourseVideos.pending, (state) => {
        state.course_videos_loading = true;
        state.course_videos_error = null;
      })
      .addCase(handleGetCourseVideos.fulfilled, (state, action) => {
        state.course_videos_loading = false;
        state.course_videos_data = action.payload;
      })
      .addCase(handleGetCourseVideos.rejected, (state, action) => {
        state.course_videos_loading = false;
        state.course_videos_error = action.payload || "Failed to load videos";
      })

      // GET QUIZZES
      .addCase(handleGetQuizzes.pending, (state) => {
        state.quizzes_loading = true;
        state.quizzes_error = null;
      })
      .addCase(handleGetQuizzes.fulfilled, (state, action) => {
        state.quizzes_loading = false;
        state.quizzes_data = action.payload;
      })
      .addCase(handleGetQuizzes.rejected, (state, action) => {
        state.quizzes_loading = false;
        state.quizzes_error = action.payload || "Failed to load quizzes";
      });
  },
});

export const {
  clearCourseVideos,
  clearMyCourses,
  clearScheduleData,
  resetCourseState,
} = coursesSlice.actions;

export default coursesSlice.reducer;
