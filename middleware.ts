import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/door-configurator")) {
    const response = NextResponse.next();
    response.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive, nosnippet"
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/door-configurator", "/door-configurator/:path*"],
};
