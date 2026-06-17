import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _post } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const initialState = {
    // Hero
    hero_loading: false,
    hero_data: null,
    hero_error: null,

    // Overview
    overview_loading: false,
    overview_data: null,
    overview_error: null,

    // Mission
    mission_loading: false,
    mission_data: null,
    mission_error: null,

    // Story
    story_loading: false,
    story_data: null,
    story_error: null,

    // Vision
    vision_loading: false,
    vision_data: null,
    vision_error: null,

    // General Features
    features_loading: false,
    features_data: [],
    features_error: null,

    // Mission Features
    mission_features_loading: false,
    mission_features_data: [],
    mission_features_error: null,

    // Vision Features
    vision_features_loading: false,
    vision_features_data: [],
    vision_features_error: null,

    // FAQs
    faqs_loading: false,
    faqs_data: [],
    faqs_error: null,

    // FAQ Categories
    faq_categories_loading: false,
    faq_categories_data: [],
    faq_categories_error: null,
};

// ================== Thunks ==================

export const handleGetAboutHero = createAsyncThunk(
    "aboutSlice/handleGetAboutHero",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_hero, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about hero failed"
            );
        }
    }
);

export const handleGetAboutOverview = createAsyncThunk(
    "aboutSlice/handleGetAboutOverview",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_overview, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about overview failed"
            );
        }
    }
);

export const handleGetAboutMission = createAsyncThunk(
    "aboutSlice/handleGetAboutMission",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_mission, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about mission failed"
            );
        }
    }
);

export const handleGetAboutStory = createAsyncThunk(
    "aboutSlice/handleGetAboutStory",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_story, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about story failed"
            );
        }
    }
);

export const handleGetAboutVision = createAsyncThunk(
    "aboutSlice/handleGetAboutVision",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_vision, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about vision failed"
            );
        }
    }
);

export const handleGetAboutFeatures = createAsyncThunk(
    "aboutSlice/handleGetAboutFeatures",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_features, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about features failed"
            );
        }
    }
);

export const handleGetAboutMissionFeatures = createAsyncThunk(
    "aboutSlice/handleGetAboutMissionFeatures",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_mission_features, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about mission features failed"
            );
        }
    }
);

export const handleGetAboutVisionFeatures = createAsyncThunk(
    "aboutSlice/handleGetAboutVisionFeatures",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_about_vision_features, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get about vision features failed"
            );
        }
    }
);

// ================== FAQ Thunks ==================

export const handleGetFaqs = createAsyncThunk(
    "aboutSlice/handleGetFaqs",
    async (payload = { category_id: 0 }, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_faqs, payload);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get FAQs failed"
            );
        }
    }
);

export const handleGetFaqCategories = createAsyncThunk(
    "aboutSlice/handleGetFaqCategories",
    async (_, thunkAPI) => {
        try {
            const res = await _post(apiRoutes.get_faq_categories, {});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data ?? err?.message ?? "Get FAQ categories failed"
            );
        }
    }
);

// ================== Combined Fetch ==================
export const handleGetAllAboutData = createAsyncThunk(
    "aboutSlice/handleGetAllAboutData",
    async (_, { dispatch }) => {
        await Promise.all([
            dispatch(handleGetAboutHero()),
            dispatch(handleGetAboutOverview()),
            dispatch(handleGetAboutMission()),
            dispatch(handleGetAboutStory()),
            dispatch(handleGetAboutVision()),
            dispatch(handleGetAboutFeatures()),
            dispatch(handleGetAboutMissionFeatures()),
            dispatch(handleGetAboutVisionFeatures()),
            dispatch(handleGetFaqs({ category_id: 0 })),
            dispatch(handleGetFaqCategories()),
        ]);
    }
);

// ================== Slice ==================
export const aboutSlice = createSlice({
    name: "aboutSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Hero
            .addCase(handleGetAboutHero.pending, (state) => {
                state.hero_loading = true;
                state.hero_error = null;
            })
            .addCase(handleGetAboutHero.fulfilled, (state, action) => {
                state.hero_loading = false;
                state.hero_data = action.payload?.message ?? null;
            })
            .addCase(handleGetAboutHero.rejected, (state, action) => {
                state.hero_loading = false;
                state.hero_error = action.payload ?? action.error?.message;
            })

            // Overview
            .addCase(handleGetAboutOverview.pending, (state) => {
                state.overview_loading = true;
                state.overview_error = null;
            })
            .addCase(handleGetAboutOverview.fulfilled, (state, action) => {
                state.overview_loading = false;
                state.overview_data = action.payload?.message ?? null;
            })
            .addCase(handleGetAboutOverview.rejected, (state, action) => {
                state.overview_loading = false;
                state.overview_error = action.payload ?? action.error?.message;
            })

            // Mission
            .addCase(handleGetAboutMission.pending, (state) => {
                state.mission_loading = true;
                state.mission_error = null;
            })
            .addCase(handleGetAboutMission.fulfilled, (state, action) => {
                state.mission_loading = false;
                state.mission_data = action.payload?.message ?? null;
            })
            .addCase(handleGetAboutMission.rejected, (state, action) => {
                state.mission_loading = false;
                state.mission_error = action.payload ?? action.error?.message;
            })

            // Story
            .addCase(handleGetAboutStory.pending, (state) => {
                state.story_loading = true;
                state.story_error = null;
            })
            .addCase(handleGetAboutStory.fulfilled, (state, action) => {
                state.story_loading = false;
                state.story_data = action.payload?.message ?? null;
            })
            .addCase(handleGetAboutStory.rejected, (state, action) => {
                state.story_loading = false;
                state.story_error = action.payload ?? action.error?.message;
            })

            // Vision
            .addCase(handleGetAboutVision.pending, (state) => {
                state.vision_loading = true;
                state.vision_error = null;
            })
            .addCase(handleGetAboutVision.fulfilled, (state, action) => {
                state.vision_loading = false;
                state.vision_data = action.payload?.message ?? null;
            })
            .addCase(handleGetAboutVision.rejected, (state, action) => {
                state.vision_loading = false;
                state.vision_error = action.payload ?? action.error?.message;
            })

            // General Features
            .addCase(handleGetAboutFeatures.pending, (state) => {
                state.features_loading = true;
                state.features_error = null;
            })
            .addCase(handleGetAboutFeatures.fulfilled, (state, action) => {
                state.features_loading = false;
                state.features_data = action.payload?.message ?? [];
            })
            .addCase(handleGetAboutFeatures.rejected, (state, action) => {
                state.features_loading = false;
                state.features_error = action.payload ?? action.error?.message;
            })

            // Mission Features
            .addCase(handleGetAboutMissionFeatures.pending, (state) => {
                state.mission_features_loading = true;
                state.mission_features_error = null;
            })
            .addCase(handleGetAboutMissionFeatures.fulfilled, (state, action) => {
                state.mission_features_loading = false;
                state.mission_features_data = action.payload?.message ?? [];
            })
            .addCase(handleGetAboutMissionFeatures.rejected, (state, action) => {
                state.mission_features_loading = false;
                state.mission_features_error = action.payload ?? action.error?.message;
            })

            // Vision Features
            .addCase(handleGetAboutVisionFeatures.pending, (state) => {
                state.vision_features_loading = true;
                state.vision_features_error = null;
            })
            .addCase(handleGetAboutVisionFeatures.fulfilled, (state, action) => {
                state.vision_features_loading = false;
                state.vision_features_data = action.payload?.message ?? [];
            })
            .addCase(handleGetAboutVisionFeatures.rejected, (state, action) => {
                state.vision_features_loading = false;
                state.vision_features_error = action.payload ?? action.error?.message;
            })

            // FAQs
            .addCase(handleGetFaqs.pending, (state) => {
                state.faqs_loading = true;
                state.faqs_error = null;
            })
            .addCase(handleGetFaqs.fulfilled, (state, action) => {
                state.faqs_loading = false;
                state.faqs_data = action.payload?.message ?? [];
            })
            .addCase(handleGetFaqs.rejected, (state, action) => {
                state.faqs_loading = false;
                state.faqs_error = action.payload ?? action.error?.message;
            })

            // FAQ Categories
            .addCase(handleGetFaqCategories.pending, (state) => {
                state.faq_categories_loading = true;
                state.faq_categories_error = null;
            })
            .addCase(handleGetFaqCategories.fulfilled, (state, action) => {
                state.faq_categories_loading = false;
                state.faq_categories_data = action.payload?.message ?? [];
            })
            .addCase(handleGetFaqCategories.rejected, (state, action) => {
                state.faq_categories_loading = false;
                state.faq_categories_error = action.payload ?? action.error?.message;
            });
    },
});

export default aboutSlice.reducer;