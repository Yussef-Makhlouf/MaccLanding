// ============================================
// API Response Types (Backend Shape)
// ============================================

export interface ApiServiceImage {
  imageLink: string;
  public_id: string;
}

export interface ApiServiceItem {
  image: ApiServiceImage;
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  description_en: string;
  description_ar: string;
  order: number;
}

export interface ApiServiceHeader {
  image: ApiServiceImage;
  title_en: string;
  title_ar: string;
  sub_title_en: string;
  sub_title_ar: string;
  description_en: string;
  description_ar: string;
}

export interface ApiService {
  _id: string;
  header: ApiServiceHeader;
  services: ApiServiceItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiServicesResponse {
  success: boolean;
  services: ApiService[];
}

export interface ApiServiceResponse {
  success: boolean;
  service: ApiService;
}

// ============================================
// Frontend Types (Localized Shape)
// ============================================

export interface ServiceImage {
  imageLink: string;
  public_id: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  order: number;
}

export interface ServiceHeader {
  image: string;
  title: string;
  sub_title: string;
  description: string;
}

export interface Service {
  id: string;
  header: ServiceHeader;
  services: ServiceItem[];
  isActive: boolean;
}

// ============================================
// Utility Types
// ============================================

export type Locale = "en" | "ar";

export interface LocalizedServicesResponse {
  services: Service[];
  locale: Locale;
}
