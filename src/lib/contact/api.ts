import type { ContactFormRequest, ContactApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://macc-fm.com/api/v1";

/**
 * Send contact form message
 */
export async function sendContactMessage(
  data: ContactFormRequest
): Promise<ContactApiResponse> {
  try {
    const url = `${API_BASE_URL}/contact/send`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    const result: ContactApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to send message");
    }

    return result;
  } catch (error) {
    console.error("❌ Error sending contact message:", error);
    throw error;
  }
}