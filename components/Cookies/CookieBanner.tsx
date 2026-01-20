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
        <p>Nous utilisons des cookies pour mesurer l’audience et améliorer le site. Vous pouvez accepter ou refuser.</p>
        <p>
          Mesure d’audience : Google Analytics (Google LLC) nous aide à comprendre la fréquentation du site (pages
          consultées, temps passé, type d’appareil).
        </p>
        <p>
          <strong>Vos droits RGPD :</strong> Vous disposez d'un droit d'accès, de rectification, d'effacement et de
          portabilité de vos données personnelles. Les données sont conservées pour une durée de 24 mois maximum. Pour
          exercer ces droits ou vous opposer au traitement, contactez-nous à{" "}
          <a href='mailto:contact@campusversailles.fr'>contact@campusversailles.fr</a>
        </p>
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
