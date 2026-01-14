import { getOrientation } from "@/strapi/orientation"
import OrientationPage from "@/views/OrientationPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "À propos | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function Orientation() {
  const orientation = await getOrientation()
  return <OrientationPage orientation={orientation} />
}
