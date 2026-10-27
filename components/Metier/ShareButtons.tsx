"use client"
import { useState } from "react"
import { FacebookShareButton, LinkedinShareButton, XShareButton } from "react-share"
import ShareIcon from "../Icons/Share"
import styles from "./ShareButton.module.css"
import actionStyles from "./ActionButton.module.css"
import { trackEvent } from "@/lib/gtag"
import FacebookIcon from "./icons/facebook"
import LinkedinIcon from "./icons/linkedin"
import XIcon from "./icons/twitter"

export default function ShareButtons({ ariaLabel, tracking }: { ariaLabel: string; tracking: string }) {
  const [copied, setCopied] = useState(false)

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = async () => {
    trackEvent(`partage_${tracking}_lien`)
    await navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFacebookShare = () => {
    trackEvent(`partage_${tracking}_facebook`)
  }

  const handleLinkedInShare = () => {
    trackEvent(`partage_${tracking}_linkedin`)
  }

  const handleXShare = () => {
    trackEvent(`partage_${tracking}_x`)
  }

  return (
    <>
      <FacebookShareButton
        resetButtonStyle={false}
        className={actionStyles.actionButton}
        url={currentUrl}
        onShareWindowClose={() => handleFacebookShare()}
        aria-label={`${ariaLabel} sur Facebook`}>
        <FacebookIcon className={styles.shareIcon} />
      </FacebookShareButton>

      <LinkedinShareButton
        resetButtonStyle={false}
        className={actionStyles.actionButton}
        url={currentUrl}
        aria-label={`${ariaLabel} sur LinkedIn`}>
        <LinkedinIcon className={styles.shareIcon} />
      </LinkedinShareButton>

      <XShareButton
        resetButtonStyle={false}
        className={actionStyles.actionButton}
        aria-label={`${ariaLabel} sur X`}
        onShareWindowClose={() => handleXShare()}>
        <XIcon className={styles.shareIcon} />
      </XShareButton>

      <button className={actionStyles.actionButton} aria-label={ariaLabel} onClick={handleCopyLink}>
        <ShareIcon className={styles.shareIcon} />
      </button>

      <div
        className={copied ? styles.copiedFeedback : `${styles.copiedFeedback} ${styles.hide}`}
        role='status'
        aria-hidden={!copied}>
        Lien copié !
      </div>
    </>
  )
}
