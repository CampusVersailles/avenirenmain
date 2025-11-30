import type { NextConfig } from "next"
import helmet from "helmet"

const csp: Record<string, string[]> = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  "img-src": ["'self'", "https:", "data:"],
  "media-src": ["'self'", "https:", "data:"],
  "script-src": ["'self'", "'unsafe-inline'"],
  "connect-src": ["'self'", "https://api-adresse.data.gouv.fr"],
  "frame-src": ["'self'", "https://www.youtube.com"],
}

if (process.env.NODE_ENV === "development") {
  csp["script-src"].push("'unsafe-eval'")
  csp["img-src"].push("http:")
  csp["media-src"].push("http:")
}

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Content-Security-Policy",
    value: Object.keys(csp)
      .map((key) => `${key} ${csp[key].join(" ")}`)
      .join(";"),
  },
]

const nextConfig: NextConfig = {
  images:
    process.env.NODE_ENV === "development"
      ? {
          remotePatterns: [
            {
              protocol: "http",
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ],
          unoptimized: true,
        }
      : undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
