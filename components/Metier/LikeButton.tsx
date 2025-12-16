"use client"

import { useState, useEffect } from "react"
import classNames from "classnames"
import LikeIcon from "../Icons/Like"
import actionStyles from "./ActionButton.module.css"
import styles from "./LikeButton.module.css"
import { trackEvent } from "@/lib/gtag"

export default function LikeButton({
  metierId,
  tracking,
  ariaLabel,
}: {
  metierId: string
  tracking: string
  ariaLabel: string
}) {
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    try {
      const likeStatus = localStorage.getItem(`metier_like_${metierId}`)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLiked(likeStatus === "true")
    } catch {}
  }, [metierId])

  const handleLikeClick = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 400)

    try {
      localStorage.setItem(`metier_like_${metierId}`, String(newLikedState))
    } catch {}

    const consent = localStorage.getItem("analytics_consent")
    if (consent === "granted") {
      trackEvent("like", { label: tracking })
    }
  }

  return (
    <button
      onClick={handleLikeClick}
      className={actionStyles.actionButton}
      aria-label={isLiked ? `Ne plus ${ariaLabel}` : ariaLabel}
      aria-pressed={isLiked}>
      <p>{isLiked ? "Liké" : "Liker"}</p>
      <LikeIcon filled={isLiked} className={classNames(styles.icon, { [styles.animating]: isAnimating })} />
    </button>
  )
}
