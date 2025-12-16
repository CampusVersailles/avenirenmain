"use client"
import { useState } from "react"
import ShareIcon from "../Icons/Share"
import styles from "./ShareButton.module.css"
import actionStyles from "./ActionButton.module.css"
import { trackEvent } from "@/lib/gtag"

export default function ShareButton({ ariaLabel, tracking }: { ariaLabel: string; tracking: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    trackEvent("share", { label: tracking })
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.container}>
      <button className={actionStyles.actionButton} aria-label={ariaLabel} onClick={handleShare}>
        <p>Partager</p>
        <ShareIcon className={styles.icon} />
      </button>
      <div
        className={copied ? styles.copiedFeedback : `${styles.copiedFeedback} ${styles.hide}`}
        role='status'
        aria-hidden={!copied}>
        Lien copié !
      </div>
    </div>
  )
}
