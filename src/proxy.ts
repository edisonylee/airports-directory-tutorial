import { createCmsProxy } from "cms-renderer/lib/proxy";
import type { NextRequest, NextResponse } from "next/server";
import { cmsConfig } from "@/lib/cms-config";

// The prebuilt cms-renderer proxy only forwards a fixed set of static
// extensions (its STATIC_FILE_REGEX has no `wasm`), so .wasm assets never reach
// upstream even when the matcher fires. Route `/wasm` through additionalPaths,
// which is forwarded unconditionally before the regex/Referer gate.
const cmsProxy = createCmsProxy({
  upstream: cmsConfig.cmsUrl,
  additionalPaths: ["/wasm"],
});

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const response = await cmsProxy(request);
  return response;
};

export const proxyConfig = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/:path*",
    "/auth/:path*",
    "/_next/:path*",
    "/((?:.*\\.(?:css|js|map|png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2|ttf|eot|txt|xml|wasm))$)",
  ],
};