import type { NextConfig } from "next"
import helmet from "helmet"

const csp: Record<string, string[]> = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  "img-src": ["'self'", "https:", "data:"],
  "media-src": ["'self'", "https:", "data:"],
  "script-src": ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
  "connect-src": [
    "'self'",
    "https://api-adresse.data.gouv.fr",
    "https://openmaptiles.data.gouv.fr",
    "https://openmaptiles.geo.data.gouv.fr",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
  ],
  "frame-src": ["'self'", "https://www.youtube.com", "https://www.dailymotion.com", "https://geo.dailymotion.com"],
  "worker-src": ["'self'", "blob:"],
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
      : {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "avenirenmain.s3.fr-par.scw.cloud",
              port: "",
              pathname: "/avenirenmain/**",
            },
            {
              protocol: "https",
              hostname: "s3.fr-par.scw.cloud",
              port: "",
              pathname: "/avenirenmain/**",
            },
          ],
        },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      // Redirects from guide-de-l-entrepreneuriat to savoir-faire-et-territoires
      {
        source: "/guide-de-l-entrepreneuriat",
        destination: "/savoir-faire-et-territoires",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/entreprendre",
        destination: "/savoir-faire-et-territoires/entreprendre",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/entreprendre/:documentId",
        destination: "/savoir-faire-et-territoires/entreprendre/:documentId",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/entreprendre/:documentId/print",
        destination: "/savoir-faire-et-territoires/entreprendre/:documentId/print",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/accompagnement",
        destination: "/savoir-faire-et-territoires/accompagnement",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/etudes-de-cas",
        destination: "/savoir-faire-et-territoires/etudes-de-cas",
        permanent: true,
      },
      {
        source: "/guide-de-l-entrepreneuriat/etudes-de-cas/:documentId",
        destination: "/savoir-faire-et-territoires/etudes-de-cas/:documentId",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
