export const PHONE_REGEX = /^\d+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_MAX = 50;
export const PHONE_MIN = 10;
export const PHONE_MAX = 15;
export const EMAIL_MAX = 254;
export const ADDRESS_MAX = 200;
export const MESSAGE_MAX = 2000;
export const TRACKING_MAX = 120;

export type ContactField =
  | "firstName"
  | "lastName"
  | "phone"
  | "address"
  | "email"
  | "message";

export type ContactTracking = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
};

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  message: string;
} & ContactTracking;

export type ContactValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: Partial<Record<ContactField, string>> };

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function optionalTracking(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, TRACKING_MAX);
}

export function validateContactPayload(
  payload: unknown
): ContactValidationResult {
  if (!payload || typeof payload !== "object") {
    return {
      ok: false,
      errors: { message: "Please complete the form and try again." },
    };
  }

  const input = payload as Record<string, unknown>;
  const errors: Partial<Record<ContactField, string>> = {};

  const firstName = asTrimmedString(input.firstName, NAME_MAX);
  const lastName = asTrimmedString(input.lastName, NAME_MAX);
  const phone = asTrimmedString(input.phone, PHONE_MAX);
  const address = asTrimmedString(input.address, ADDRESS_MAX);
  const email = asTrimmedString(input.email, EMAIL_MAX).toLowerCase();
  const message = asTrimmedString(input.message, MESSAGE_MAX);

  if (!firstName) {
    errors.firstName = "First name is required.";
  }

  if (!lastName) {
    errors.lastName = "Last name is required.";
  }

  if (!phone) {
    errors.phone = "Phone is required.";
  } else if (!PHONE_REGEX.test(phone) || phone.length < PHONE_MIN) {
    errors.phone = "Enter a phone number using digits only.";
  }

  if (!address) {
    errors.address = "Address is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      phone,
      address,
      email,
      message,
      utmSource: optionalTracking(input.utmSource),
      utmMedium: optionalTracking(input.utmMedium),
      utmCampaign: optionalTracking(input.utmCampaign),
      gclid: optionalTracking(input.gclid),
    },
  };
}

export function isHoneypotFilled(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  const website = (payload as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}
