// ============================================
// API Request Types
// ============================================

export interface ContactFormRequest {
  fullName: string;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  message: string;
}

// ============================================
// API Response Types
// ============================================

export interface ContactApiResponse {
  success: boolean;
  message: string;
}

// ============================================
// Frontend Form State (with privacy checkbox)
// ============================================

export interface ContactFormData extends ContactFormRequest {
  privacyAccepted: boolean;
}