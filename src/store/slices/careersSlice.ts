import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCareersByLanguage, getCareerById, submitJobApplication } from "@/lib/careers/api";
import type { Career, Locale, CareerFilters } from "@/lib/careers/types";

interface CareersState {
  // All careers list
  careers: Career[];
  careersLoading: boolean;
  careersError: string | null;

  // Current locale and filters
  currentLocale: Locale | null;
  currentFilters: CareerFilters | null;

  // Selected career details
  selectedCareer: Career | null;
  selectedCareerLoading: boolean;
  selectedCareerError: string | null;

  // Application submission state
  applicationSubmitting: boolean;
  applicationSuccess: boolean;
  applicationError: string | null;

  // Last fetch timestamp for cache management
  lastFetchTime: number | null;
}

const initialState: CareersState = {
  careers: [],
  careersLoading: true,
  careersError: null,
  currentLocale: null,
  currentFilters: null,
  selectedCareer: null,
  selectedCareerLoading: false,
  selectedCareerError: null,
  applicationSubmitting: false,
  applicationSuccess: false,
  applicationError: null,
  lastFetchTime: null,
};

// ============================================
// Async Thunks
// ============================================

/**
 * Fetch all careers for a locale with optional filters
 */
export const fetchCareersByLanguage = createAsyncThunk(
  "careers/fetchByLanguage",
  async ({ locale, filters }: { locale: Locale; filters?: CareerFilters }, { rejectWithValue }) => {
    try {
      const response = await getCareersByLanguage(locale, filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch careers");
    }
  }
);

/**
 * Fetch a single career by ID
 */
export const fetchCareerById = createAsyncThunk(
  "careers/fetchById",
  async ({ id, locale }: { id: string; locale: Locale }, { rejectWithValue }) => {
    try {
      const career = await getCareerById(id, locale);
      if (!career) {
        return rejectWithValue("Career not found");
      }
      return career;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch career");
    }
  }
);

/**
 * Submit job application
 */
export const submitApplication = createAsyncThunk(
  "careers/submitApplication",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const result = await submitJobApplication(formData);
      if (!result.success) {
        return rejectWithValue(result.message || "Failed to submit application");
      }
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to submit application");
    }
  }
);

/**
 * Submit general application (without specific career)
 */
export const submitGeneralApplication = createAsyncThunk(
  "careers/submitGeneralApplication",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { submitGeneralApplication: submitGeneral } = await import("@/lib/careers/api");
      const result = await submitGeneral(formData);
      if (!result.success) {
        return rejectWithValue(result.message || "Failed to submit application");
      }
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to submit application");
    }
  }
);

// ============================================
// Slice
// ============================================

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    clearSelectedCareer: (state) => {
      state.selectedCareer = null;
      state.selectedCareerError = null;
    },

    setCurrentLocale: (state, action: PayloadAction<Locale>) => {
      state.currentLocale = action.payload;
    },

    setCurrentFilters: (state, action: PayloadAction<CareerFilters>) => {
      state.currentFilters = action.payload;
    },

    clearFilters: (state) => {
      state.currentFilters = null;
    },

    clearErrors: (state) => {
      state.careersError = null;
      state.selectedCareerError = null;
      state.applicationError = null;
    },

    resetApplicationState: (state) => {
      state.applicationSubmitting = false;
      state.applicationSuccess = false;
      state.applicationError = null;
    },

    resetCareersState: () => initialState,
  },

  extraReducers: (builder) => {
    // Fetch all careers
    builder
      .addCase(fetchCareersByLanguage.pending, (state) => {
        state.careersLoading = true;
        state.careersError = null;
      })
      .addCase(fetchCareersByLanguage.fulfilled, (state, action) => {
        state.careersLoading = false;
        state.careers = action.payload.careers;
        state.currentLocale = action.payload.locale;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchCareersByLanguage.rejected, (state, action) => {
        state.careersLoading = false;
        state.careersError = action.payload as string;
      });

    // Fetch single career
    builder
      .addCase(fetchCareerById.pending, (state) => {
        state.selectedCareerLoading = true;
        state.selectedCareerError = null;
      })
      .addCase(fetchCareerById.fulfilled, (state, action) => {
        state.selectedCareerLoading = false;
        state.selectedCareer = action.payload;
      })
      .addCase(fetchCareerById.rejected, (state, action) => {
        state.selectedCareerLoading = false;
        state.selectedCareerError = action.payload as string;
      });

    // Submit application
    builder
      .addCase(submitApplication.pending, (state) => {
        state.applicationSubmitting = true;
        state.applicationError = null;
        state.applicationSuccess = false;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.applicationSubmitting = false;
        state.applicationSuccess = true;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.applicationSubmitting = false;
        state.applicationError = action.payload as string;
      });

    // Submit general application
    builder
      .addCase(submitGeneralApplication.pending, (state) => {
        state.applicationSubmitting = true;
        state.applicationError = null;
        state.applicationSuccess = false;
      })
      .addCase(submitGeneralApplication.fulfilled, (state) => {
        state.applicationSubmitting = false;
        state.applicationSuccess = true;
      })
      .addCase(submitGeneralApplication.rejected, (state, action) => {
        state.applicationSubmitting = false;
        state.applicationError = action.payload as string;
      });
  },
});

// ============================================
// Actions
// ============================================

export const {
  clearSelectedCareer,
  setCurrentLocale,
  setCurrentFilters,
  clearFilters,
  clearErrors,
  resetApplicationState,
  resetCareersState,
} = careersSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectCareers = (state: { careers: CareersState }) =>
  state.careers.careers;

export const selectCareersLoading = (state: { careers: CareersState }) =>
  state.careers.careersLoading;

export const selectCareersError = (state: { careers: CareersState }) =>
  state.careers.careersError;

export const selectCurrentLocale = (state: { careers: CareersState }) =>
  state.careers.currentLocale;

export const selectCurrentFilters = (state: { careers: CareersState }) =>
  state.careers.currentFilters;

export const selectSelectedCareer = (state: { careers: CareersState }) =>
  state.careers.selectedCareer;

export const selectSelectedCareerLoading = (state: { careers: CareersState }) =>
  state.careers.selectedCareerLoading;

export const selectSelectedCareerError = (state: { careers: CareersState }) =>
  state.careers.selectedCareerError;

export const selectApplicationSubmitting = (state: { careers: CareersState }) =>
  state.careers.applicationSubmitting;

export const selectApplicationSuccess = (state: { careers: CareersState }) =>
  state.careers.applicationSuccess;

export const selectApplicationError = (state: { careers: CareersState }) =>
  state.careers.applicationError;

// Helper selector to get career by ID from cache
export const selectCareerById = (id: string) => (state: { careers: CareersState }) =>
  state.careers.careers.find((career) => career.id === id);

export default careersSlice.reducer;