import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState  = {
  login_loading : false,  
  register_loading : false,

  login_data: [],
  register_data : [],

  refresh_token_loading : false,
  refresh_token_data :[],
}

export const handleRegister = createAsyncThunk(
  "authSlice/handleRegister",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(apiRoutes.signUp, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "authSlice/handleLogin",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post(apiRoutes.login, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const handleRefreshToken = createAsyncThunk(
  "authSlice/handleRefreshToken",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await _post("ask_refresh_tokens_data.php", data, {
        baseURL: "https://camp-coding.tech/eg_Institute/",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name:"authSlice",
  initialState,
  extraReducers : (builder) => {
    builder
    .addCase(handleRegister.pending ,(state) => {
      state.register_loading = true;
    })
    .addCase(handleRegister.fulfilled, (state , action) => {
      state.register_data = action.payload; 
      state.register_loading = false;
    })
    .addCase(handleRegister.rejected , (state) => {
      state.register_loading = false;
    })

    .addCase(handleLogin.pending ,(state) => {
      state.login_loading = true;
    })
    .addCase(handleLogin.fulfilled, (state , action) => {
      state.login_data = action.payload; 
      state.login_loading = false;
    })
    .addCase(handleLogin.rejected , (state) => {
      state.login_loading = false;
    })


     .addCase(handleRefreshToken.pending ,(state) => {
      state.refresh_token_loading = true;
    })
    .addCase(handleRefreshToken.fulfilled, (state , action) => {
      state.refresh_token_data = action.payload; 
      state.refresh_token_loading = false;
    })
    .addCase(handleRefreshToken.rejected , (state) => {
      state.refresh_token_loading = false;
    })
  }
})

export default authSlice.reducer;