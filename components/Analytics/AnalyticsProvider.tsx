"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView } from "@/lib/gtag"

export const AnalyticsProvider = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}

export default AnalyticsProvider
