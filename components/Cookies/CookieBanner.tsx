"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./CookieBanner.module.css"
import { setAnalyticsConsent } from "@/lib/gtag"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const acceptButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    try {
      const consent = localStorage.getItem("analytics_consent")
      if (!consent) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (visible && acceptButtonRef.current) {
      acceptButtonRef.current.focus()
    }
  }, [visible])

  const accept = () => {
    setAnalyticsConsent(true)
    setVisible(false)
    window.location.reload()
  }

  const refuse = () => {
    setAnalyticsConsent(false)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className={styles.banner}
      role='dialog'
      aria-modal='true'
      aria-live='polite'
      aria-label='Préférences de cookies'
      aria-describedby='cookie-banner-description'
      tabIndex={-1}>
      <div className={styles.text} id='cookie-banner-description'>
        Ce site utilise Google Analytics afin d'analyser son audience et d'améliorer votre expérience de navigation. Ces
        données sont traitées de manière anonyme et confidentielle.
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={refuse}>
          Refuser
        </button>
        <button className={styles.buttonPrimary} onClick={accept} ref={acceptButtonRef}>
          Accepter
        </button>
      </div>
    </div>
  )
}
