import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url")

  if (!target) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(target)
  } catch {
    return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 })
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 })
  }

  const strapiHost = (() => {
    const value = process.env.STRAPI_URL
    if (!value) return null
    try {
      return new URL(value).hostname
    } catch {
      return null
    }
  })()

  const allowedHosts = new Set(
    [
      strapiHost,
      "avenirenmain.s3.fr-par.scw.cloud",
      "s3.fr-par.scw.cloud",
      process.env.NODE_ENV === "development" ? "localhost" : null,
    ].filter((host): host is string => Boolean(host)),
  )

  if (!allowedHosts.has(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 400 })
  }

  const upstream = await fetch(parsed.toString(), {
    cache: "force-cache",
    headers: {
      Accept: "image/*,*/*;q=0.8",
    },
  })

  if (!upstream.ok) {
    return NextResponse.json({ error: "Unable to fetch image" }, { status: upstream.status })
  }

  const contentType = upstream.headers.get("content-type") || ""
  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "Upstream response is not an image" }, { status: 415 })
  }

  const cacheControl = upstream.headers.get("cache-control") || "public, max-age=86400"
  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  })
}
