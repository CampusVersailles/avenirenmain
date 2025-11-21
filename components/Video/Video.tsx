"use client"

import React, { forwardRef } from "react"

const Video = forwardRef<HTMLVideoElement, React.VideoHTMLAttributes<HTMLVideoElement>>((props, ref) => {
  return (
    <video
      ref={ref}
      onMouseEnter={(event) => event.currentTarget.play()}
      onMouseLeave={(event) => event.currentTarget.pause()}
      muted
      loop
      {...props}
    />
  )
})

Video.displayName = "Video"

export default Video
