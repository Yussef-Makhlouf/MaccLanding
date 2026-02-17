import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getServicesByLanguage, getServiceById } from "@/lib/services/api";
import type { Service, Locale } from "@/lib/services/types";
import { getMockServices, getMockServiceById } from "@/lib/services/mockData";

interface ServicesState {
  // All services list
  services: Service[];
  servicesLoading: boolean;
  servicesError: string | null;

  // Current locale
  currentLocale: Locale | null;

  // Selected service details
  selectedService: Service | null;
  selectedServiceLoading: boolean;
  selectedServiceError: string | null;

  // Last fetch timestamp for cache management
  lastFetchTime: number | null;
}

const initialState: ServicesState = {
  services: [],
  servicesLoading: true,
  servicesError: null,
  currentLocale: null,
  selectedService: null,
  selectedServiceLoading: false,
  selectedServiceError: null,
  lastFetchTime: null,
};

// ============================================
// Async Thunks
// ============================================

/**
 * Fetch all services for a locale
 */
export const fetchServicesByLanguage = createAsyncThunk(
  "services/fetchByLanguage",
  async (locale: Locale, { rejectWithValue }) => {
    try {
      const response = await getServicesByLanguage(locale);
      // If API returns success but empty services, consider fallback? 
      // For now, if it succeeds, we use it. If it fails, we fallback.
      if (!response.services || response.services.length === 0) {
        console.warn("API returned empty services, using mock data.");
        return { services: getMockServices(locale), locale };
      }
      return response;
    } catch (error: any) {
      console.warn("API failed to fetch services, using mock data:", error);
      return { services: getMockServices(locale), locale };
    }
  }
);

/**
 * Fetch a single service by ID
 */
export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async ({ id, locale }: { id: string; locale: Locale }, { rejectWithValue }) => {
    try {
      const service = await getServiceById(id, locale);
      if (!service) {
        // Try to find in mock data
        const mockService = getMockServiceById(id, locale);
        if (mockService) {
          console.warn(`Service ${id} not found in API, using mock data.`);
          return mockService;
        }
        return rejectWithValue("Service not found");
      }
      return service;
    } catch (error: any) {
      console.warn(`API failed to fetch service ${id}, checking mock data:`, error);
      const mockService = getMockServiceById(id, locale);
      if (mockService) return mockService;
      return rejectWithValue(error.message || "Failed to fetch service");
    }
  }
);

// ============================================
// Slice
// ============================================

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearSelectedService: (state) => {
      state.selectedService = null;
      state.selectedServiceError = null;
    },

    setCurrentLocale: (state, action: PayloadAction<Locale>) => {
      state.currentLocale = action.payload;
    },

    clearErrors: (state) => {
      state.servicesError = null;
      state.selectedServiceError = null;
    },

    resetServicesState: () => initialState,
  },

  extraReducers: (builder) => {
    // Fetch all services
    builder
      .addCase(fetchServicesByLanguage.pending, (state) => {
        state.servicesLoading = true;
        state.servicesError = null;
      })
      .addCase(fetchServicesByLanguage.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = action.payload.services;
        state.currentLocale = action.payload.locale;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchServicesByLanguage.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload as string;
      });

    // Fetch single service
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.selectedServiceLoading = true;
        state.selectedServiceError = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.selectedServiceLoading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.selectedServiceLoading = false;
        state.selectedServiceError = action.payload as string;
      });
  },
});

// ============================================
// Actions
// ============================================

export const {
  clearSelectedService,
  setCurrentLocale,
  clearErrors,
  resetServicesState,
} = servicesSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectServices = (state: { services: ServicesState }) =>
  state.services.services;

export const selectServicesLoading = (state: { services: ServicesState }) =>
  state.services.servicesLoading;

export const selectServicesError = (state: { services: ServicesState }) =>
  state.services.servicesError;

export const selectCurrentLocale = (state: { services: ServicesState }) =>
  state.services.currentLocale;

export const selectSelectedService = (state: { services: ServicesState }) =>
  state.services.selectedService;

export const selectSelectedServiceLoading = (state: { services: ServicesState }) =>
  state.services.selectedServiceLoading;

export const selectSelectedServiceError = (state: { services: ServicesState }) =>
  state.services.selectedServiceError;

// Helper selector to get service by ID from cache
export const selectServiceById = (id: string) => (state: { services: ServicesState }) =>
  state.services.services.find((service) => service.id === id);

export default servicesSlice.reducer;
