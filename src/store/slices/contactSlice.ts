import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { sendContactMessage } from "@/lib/contact/api";
import type { ContactFormRequest, ContactApiResponse } from "@/lib/contact/types";

interface ContactState {
  // Submission state
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  
  // Response message
  responseMessage: string | null;
  
  // Last submission timestamp
  lastSubmitTime: number | null;
}

const initialState: ContactState = {
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  responseMessage: null,
  lastSubmitTime: null,
};

// ============================================
// Async Thunks
// ============================================

/**
 * Submit contact form
 */
export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (data: ContactFormRequest, { rejectWithValue }) => {
    try {
      const response = await sendContactMessage(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to send message");
    }
  }
);

// ============================================
// Slice
// ============================================

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Reset submission state
    resetSubmitState: (state) => {
      state.isSubmitting = false;
      state.submitSuccess = false;
      state.submitError = null;
      state.responseMessage = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.submitError = null;
    },
    
    // Reset entire state
    resetContactState: () => initialState,
  },
  
  extraReducers: (builder) => {
    builder
      // Submit form - pending
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitSuccess = false;
        state.submitError = null;
        state.responseMessage = null;
      })
      // Submit form - fulfilled
      .addCase(submitContactForm.fulfilled, (state, action: PayloadAction<ContactApiResponse>) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        state.responseMessage = action.payload.message;
        state.lastSubmitTime = Date.now();
      })
      // Submit form - rejected
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = false;
        state.submitError = action.payload as string;
        state.responseMessage = null;
      });
  },
});

// ============================================
// Actions
// ============================================

export const {
  resetSubmitState,
  clearError,
  resetContactState,
} = contactSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectIsSubmitting = (state: { contact: ContactState }) =>
  state.contact.isSubmitting;

export const selectSubmitSuccess = (state: { contact: ContactState }) =>
  state.contact.submitSuccess;

export const selectSubmitError = (state: { contact: ContactState }) =>
  state.contact.submitError;

export const selectResponseMessage = (state: { contact: ContactState }) =>
  state.contact.responseMessage;

export const selectLastSubmitTime = (state: { contact: ContactState }) =>
  state.contact.lastSubmitTime;

export default contactSlice.reducer;