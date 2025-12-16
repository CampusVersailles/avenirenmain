"use client"

import { useState, useEffect } from "react"
import LikeIcon from "../Icons/Like"
import actionStyles from "./ActionButton.module.css"
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

  useEffect(() => {
    try {
      const likeStatus = localStorage.getItem(`metier_like_${metierId}`)
      setIsLiked(likeStatus === "true")
    } catch {}
  }, [metierId])

  const handleLikeClick = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)

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
      <LikeIcon filled={isLiked} />
    </button>
  )
}
