export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export const trackPageView = (url: string) => {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") {
    return
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: url,
    })
  }
}

export const trackEvent = (action: string, params?: Record<string, string | number>) => {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") {
    return
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", action, params)
  }
}

export const setAnalyticsConsent = (granted: boolean) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem("analytics_consent", granted ? "granted" : "denied")
  } catch {
    // ignore storage errors
  }
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    })
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}
