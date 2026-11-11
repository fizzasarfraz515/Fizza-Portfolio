import { site } from "@/data/site";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SubmitResult = "sent" | "mailto";

/**
 * If VITE_CONTACT_ENDPOINT is set (Formspree, Getform, etc.) the message is POSTed there.
 * Otherwise nothing can be delivered server-side, so we open the visitor's email app with the
 * message pre-filled and report that honestly.
 */
export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Form service responded with ${response.status}`);
    }
    return "sent";
  }

  const body = `${payload.message}\n\nFrom: ${payload.name} (${payload.email})`;
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
    payload.subject,
  )}&body=${encodeURIComponent(body)}`;
  return "mailto";
}
