"use client"

import React from "react"

const Video = (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
  return (
    <video
      onMouseEnter={(event) => event.currentTarget.play()}
      onMouseLeave={(event) => event.currentTarget.pause()}
      muted
      loop
      {...props}
    />
  )
}

export default Video
