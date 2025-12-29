import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";
import { configs } from "../configs";

// helpers
const getTokenSafe = () => {
  try {
    return localStorage.getItem(configs.localstorageEgyIntstituteTokenName);
  } catch {
    return null;
  }
};

const initialState = {
  all_blogs_loading: false,
  all_blogs_data: null, // خليها null أو {} حسب API
  all_blogs_error: null,

  make_comment_loading: false,
  make_comment_data: null,
  make_comment_error: null,
  make_Like_loading: false,
  make_Like_data: null,
  make_Like_error: null,

  blog_details_loading: false,
  blog_details_data: null,
  blog_details_error: null,
};

export const handleGetBlogDetails = createAsyncThunk(
  "blogsSlice/handleGetBlogDetails",
  async (payload, thunkAPI) => {
    try {
      const res = await _post(apiRoutes.get_blog_details, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? err?.message ?? "Get blog details failed"
      );
    }
  }
);
export const handleGetAllBlogs = createAsyncThunk(
  "blogsSlice/handleGetAllBlogs",
  async (payload, thunkAPI) => {
    try {
      const res = await _post(apiRoutes.get_blogs, payload);
      return res.data; // ✅ data only (serializable) 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? err?.message ?? "Get blogs failed"
      );
    }
  }
);
export const handleMakeComment = createAsyncThunk(
  "blogsSlice/handleMakeComment",
  async ({ payload }, thunkAPI) => {
    try {
      const res = await _post(apiRoutes.make_comment, payload); // ✅ نفس instance
      return res.data;
    } catch (err) {
      console.log("AXIOS ERR:", {
        message: err?.message,
        code: err?.code,
        url: err?.config?.url,
      });
      return thunkAPI.rejectWithValue(err?.message ?? "Network Error");
    }
  }
);
export const handleLike = createAsyncThunk(
  "blogsSlice/handleLike",
  async ({ payload }, thunkAPI) => {
    try {
      const res = await _post(apiRoutes.make_like, payload); // ✅ نفس instance
      return res.data;
    } catch (err) {
      console.log("AXIOS ERR:", {
        message: err?.message,
        code: err?.code,
        url: err?.config?.url,
      });
      return thunkAPI.rejectWithValue(err?.message ?? "Network Error");
    }
  }
);
export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== Get All Blogs =====
      .addCase(handleGetAllBlogs.pending, (state) => {
        state.all_blogs_loading = true;
        state.all_blogs_error = null;
      })
      .addCase(handleGetAllBlogs.fulfilled, (state, action) => {
        state.all_blogs_loading = false;
        state.all_blogs_data = action.payload; // ✅ serializable
      })
      .addCase(handleGetAllBlogs.rejected, (state, action) => {
        state.all_blogs_loading = false;
        state.all_blogs_error = action.payload ?? action.error?.message;
      })

      // ===== Make Comment =====
      .addCase(handleMakeComment.pending, (state) => {
        state.make_comment_loading = true; // ✅ مش all_blogs_loading
        state.make_comment_error = null;
        state.make_comment_data = null;
      })
      .addCase(handleMakeComment.fulfilled, (state, action) => {
        state.make_comment_loading = false;
        state.make_comment_data = action.payload;
      })
      .addCase(handleMakeComment.rejected, (state, action) => {
        state.make_comment_loading = false;
        state.make_comment_error = action.payload ?? action.error?.message;
      })
      .addCase(handleLike.pending, (state) => {
        state.make_Like_loading = true;
        state.make_Like_error = null;
        state.make_Like_data = null;
      })
      .addCase(handleLike.fulfilled, (state, action) => {
        state.make_Like_loading = false;
        state.make_Like_data = action.payload;
      })
      .addCase(handleLike.rejected, (state, action) => {
        state.make_Like_loading = false;
        state.make_Like_error = action.payload ?? action.error?.message;
      })

      // ===== Get Blog Details =====
      .addCase(handleGetBlogDetails.pending, (state) => {
        state.blog_details_loading = true;
        state.blog_details_error = null;
        state.blog_details_data = null;
      })
      .addCase(handleGetBlogDetails.fulfilled, (state, action) => {
        state.blog_details_loading = false;
        state.blog_details_data = action.payload;
      })
      .addCase(handleGetBlogDetails.rejected, (state, action) => {
        state.blog_details_loading = false;
        state.blog_details_error = action.payload ?? action.error?.message;
      });
  },
});

export default blogsSlice.reducer;
