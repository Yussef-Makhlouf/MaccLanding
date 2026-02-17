import type {
  ApiCareersResponse,
  ApiCareerResponse,
  ApiCareer,
  Career,
  Locale,
  LocalizedCareersResponse,
  CareerFilters,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to map API career to localized career
function mapApiCareerToLocalized(career: ApiCareer, locale: Locale): Career {
  return {
    id: career._id,
    title: locale === "en" ? career.title_en : career.title_ar,
    department: locale === "en" ? career.department_en : career.department_ar,
    location: locale === "en" ? career.location_en : career.location_ar,
    employmentType: locale === "en" ? career.employmentType_en : career.employmentType_ar,
    shortDescription: locale === "en" ? career.shortDescription_en : career.shortDescription_ar,
    description: locale === "en" ? career.description_en : career.description_ar,
    responsibilities: locale === "en" ? career.responsibilities_en : career.responsibilities_ar,
    requirements: locale === "en" ? career.requirements_en : career.requirements_ar,
    isActive: career.isActive,
    createdAt: career.createdAt,
    updatedAt: career.updatedAt,
  };
}

/**
 * Fetch all careers for a specific locale with optional filters
 */
export async function getCareersByLanguage(
  locale: Locale,
  filters?: CareerFilters
): Promise<LocalizedCareersResponse> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      lang: locale,
    });

    if (filters) {
      if (filters.department) queryParams.append("department", filters.department);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.employmentType) queryParams.append("employmentType", filters.employmentType);
      if (filters.isActive !== undefined) queryParams.append("isActive", String(filters.isActive));
    }

    const url = `${API_BASE_URL}/careers/?${queryParams.toString()}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiCareersResponse = await response.json();

    if (!data.success || !Array.isArray(data.careers)) {
      throw new Error("Invalid API response format");
    }

    const localizedCareers = data.careers
      .filter((career) => career.isActive)
      .map((career) => mapApiCareerToLocalized(career, locale))
      .sort((a, b) => {
        // Sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return {
      careers: localizedCareers,
      locale,
      count: localizedCareers.length,
    };
  } catch (error) {
    console.error("❌ Error fetching careers:", error);
    throw error;
  }
}

/**
 * Fetch a single career by ID for a specific locale
 */
export async function getCareerById(id: string, locale: Locale): Promise<Career | null> {
  try {
    // Validate ID first
    if (!id || id === "undefined" || id === "null") {
      console.error("❌ Invalid career ID provided:", id);
      return null;
    }

    const url = `${API_BASE_URL}/careers/one/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️ Career not found (404): ${id}`);
        return null;
      }
      console.error(`❌ HTTP Error ${response.status}:`, response.statusText);
      return null;
    }

    const data: ApiCareerResponse = await response.json();

    if (!data.success || !data.careers) {
      console.error("❌ Invalid API response format");
      return null;
    }

    const localizedCareer = mapApiCareerToLocalized(data.careers, locale);

    return localizedCareer;
  } catch (error) {
    console.error("❌ Failed to fetch career:", error);
    return null;
  }
}

/**
 * Submit job application
 */
export async function submitJobApplication(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const url = `${API_BASE_URL}/applications/apply`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header for FormData, browser will set it with boundary
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("❌ Failed to submit application:", error);
    return {
      success: false,
      message: "Failed to submit application",
    };
  }
}

/**
 * Submit general application (without specific career)
 */
export async function submitGeneralApplication(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const url = `${API_BASE_URL}/applications/apply-general`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("❌ Failed to submit general application:", error);
    return {
      success: false,
      message: "Failed to submit application",
    };
  }
}