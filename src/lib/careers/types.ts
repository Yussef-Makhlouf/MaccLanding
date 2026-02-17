// ============================================
// API Response Types (Backend Shape)
// ============================================

export interface ApiCareer {
  _id: string;
  title_en: string;
  title_ar: string;
  department_en: string;
  department_ar: string;
  location_en: string;
  location_ar: string;
  employmentType_en: string;
  employmentType_ar: string;
  shortDescription_en: string;
  shortDescription_ar: string;
  description_en: string;
  description_ar: string;
  responsibilities_en: string[];
  responsibilities_ar: string[];
  requirements_en: string[];
  requirements_ar: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiCareersResponse {
  success: boolean;
  lang: string;
  count: number;
  careers: ApiCareer[];
}

export interface ApiCareerResponse {
  success: boolean;
  message: string;
  careers: ApiCareer; // singular "careers" response
}

// ============================================
// Frontend Types (Localized Shape)
// ============================================

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Utility Types
// ============================================

export type Locale = "en" | "ar";

export interface LocalizedCareersResponse {
  careers: Career[];
  locale: Locale;
  count: number;
}

// For filtering careers
export interface CareerFilters {
  department?: string;
  location?: string;
  employmentType?: string;
  isActive?: boolean;
}