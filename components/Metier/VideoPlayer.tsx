"use client"

import { useRef } from "react"
import { trackEvent } from "@/lib/gtag"
import styles from "./MetierDescription.module.css"

interface VideoPlayerProps {
  videoUrl: string
  metierTitle: string
}

export default function VideoPlayer({ videoUrl, metierTitle }: VideoPlayerProps) {
  const hasTrackedPlay = useRef(false)

  const getEmbedUrl = (url: string) => {
    // Convertir l'URL YouTube en URL embed
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    const match = url.match(youtubeRegex)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    return url
  }

  return (
    <iframe
      title='Vidéo de présentation du métier'
      src={`${getEmbedUrl(videoUrl)}?enablejsapi=1`}
      className={styles.descriptionVideo}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      onLoad={(e) => {
        if (hasTrackedPlay.current) {
          return
        }

        const iframe = e.currentTarget
        iframe.contentWindow?.postMessage('{"event":"listening"}', "*")
        window.addEventListener("message", (event) => {
          if (event.origin === "https://www.youtube.com") {
            try {
              const data = JSON.parse(event.data)
              if (data.event === "onStateChange" && data.info === 1) {
                trackEvent(`video_${metierTitle}`)
                hasTrackedPlay.current = true
              }
            } catch {
              // ignore
            }
          }
        })
      }}
    />
  )
}
