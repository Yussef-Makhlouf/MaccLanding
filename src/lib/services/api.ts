import { resolveServiceColor } from "./serviceColors";
import type {
  ApiServicesResponse,
  ApiServiceResponse,
  ApiService,
  Service,
  ServiceItem,
  Locale,
  LocalizedServicesResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const SERVICE_NAME_TO_ID: Record<string, string> = {
  "Hard Services": "1",
  "Soft Services": "2",
  "Ground Services": "3",
  "Special Projects Services": "4",
  "Engineering Services": "5",
  "Catering Services": "6",
};

// Helper function to map API service to localized service
function mapApiServiceToLocalized(service: ApiService, locale: Locale): Service {
  const serviceTitleEn = (service.header?.title_en || "").trim();
  const serviceColor = resolveServiceColor(serviceTitleEn);

  // Use stable numerical ID if title is known, otherwise fallback to _id
  const stableId = SERVICE_NAME_TO_ID[serviceTitleEn] || service._id || Math.random().toString(36).substring(7);

  return {
    id: stableId,
    isActive: service.isActive ?? true,
    header: {
      image: service.header?.image?.imageLink || "/images/placeholder.jpg",
      title: (locale === "en" ? service.header?.title_en : service.header?.title_ar) || "",
      sub_title: (locale === "en" ? service.header?.sub_title_en : service.header?.sub_title_ar) || "",
      description: (locale === "en" ? service.header?.description_en : service.header?.description_ar) || "",
    },
    services: (service.services || []).map((item, index): ServiceItem => {
      const itemOrder = item?.order ?? (index + 1);
      return {
        id: `${service._id}-item-${index}`,
        number: String(itemOrder).padStart(2, "0"),
        title: (locale === "en" ? item?.title_en : item?.title_ar) || "",
        category: (locale === "en" ? item?.category_en : item?.category_ar) || "",
        description: (locale === "en" ? item?.description_en : item?.description_ar) || "",
        image: item?.image?.imageLink || "/images/placeholder.jpg",
        color: serviceColor,
        order: itemOrder,
      };
    }),
  };
}

/**
 * Fetch all services for a specific locale
 */
export async function getServicesByLanguage(locale: Locale): Promise<LocalizedServicesResponse> {
  try {
    if (!API_BASE_URL) {
      console.warn("⚠️ API_BASE_URL is not defined. Using mock data fallback.");
      throw new Error("API_BASE_URL not defined");
    }
    const url = `${API_BASE_URL}/services/`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiServicesResponse = await response.json();

    if (!data.success || !Array.isArray(data.services)) {
      throw new Error("Invalid API response format");
    }

    const localizedServices = data.services
      .filter((service) => service.isActive)
      .map((service) => mapApiServiceToLocalized(service, locale))
      .sort((a, b) => {
        // Sort by creation date if needed (newest first)
        return 0;
      });


    return {
      services: localizedServices,
      locale,
    };
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    throw error;
  }
}

/**
 * Fetch a single service by ID for a specific locale
 */
export async function getServiceById(id: string, locale: Locale): Promise<Service | null> {
  try {
    // Validate ID first
    if (!id || id === "undefined" || id === "null") {
      console.error("❌ Invalid service ID provided:", id);
      return null;
    }

    if (!API_BASE_URL) {
      console.warn("⚠️ API_BASE_URL is not defined. Falling back to mock data.");
      return null;
    }

    const url = `${API_BASE_URL}/services/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`⚠️ Service not found (404): ${id}`);
        return null;
      }
      console.error(`❌ HTTP Error ${response.status}:`, response.statusText);
      return null;
    }

    const data: ApiServiceResponse = await response.json();

    if (!data.success || !data.service) {
      console.error("❌ Invalid API response format");
      return null;
    }

    const localizedService = mapApiServiceToLocalized(data.service, locale);

    return localizedService;
  } catch (error) {
    console.error("❌ Failed to fetch service:", error);
    return null;
  }
}