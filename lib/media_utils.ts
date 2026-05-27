export function getMediaUrl(media: { provider?: string; url: string }) {
  if (!media) {
    return ""
  }

  if (media.provider === "local") {
    return `${process.env.STRAPI_URL}${media.url}`
  }
  return media.url
}
