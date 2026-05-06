import axios from "axios"

const rawStrapiUrl = process.env.STRAPI_URL?.trim() || ""
const normalizedStrapiUrl = rawStrapiUrl.replace(/\/+$/, "")
const strapiOrigin = normalizedStrapiUrl.replace(/\/api$/, "")

const axiosClient = axios.create({
  baseURL: `${strapiOrigin}/api/`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
})

export default axiosClient
