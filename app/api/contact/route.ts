import { NextResponse } from "next/server";
import {
  isHoneypotFilled,
  validateContactPayload,
} from "@/lib/contact/validation";
import {
  checkContactRateLimit,
  getRequestIp,
} from "@/lib/contact/rateLimit";
import { sendContactEmail } from "@/lib/contact/sendContactEmail";

const MAX_BODY_BYTES = 16 * 1024;

const GENERIC_ERROR =
  "Something went wrong. Please try again or call (587) 215-1911.";

function jsonError(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json(
    {
      ok: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status }
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError(413, GENERIC_ERROR);
  }

  const ip = getRequestIp(request);
  if (!checkContactRateLimit(ip).ok) {
    return jsonError(429, GENERIC_ERROR);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError(400, GENERIC_ERROR);
  }

  if (isHoneypotFilled(payload)) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: validation.errors,
      },
      { status: 422 }
    );
  }

  try {
    await sendContactEmail(validation.data);
  } catch (error) {
    console.error("[contact] Email delivery failed");
    if (error instanceof Error) {
      console.error(error.message);
    }
    return jsonError(502, GENERIC_ERROR);
  }

  return NextResponse.json({ ok: true });
}
