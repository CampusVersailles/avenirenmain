import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${process.env.STRAPI_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
})

export default axiosClient
