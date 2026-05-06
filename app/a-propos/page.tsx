import { getOrientation } from "@/strapi/orientation"
import OrientationPage from "@/views/OrientationPage"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "À propos | L’Avenir en Main",
}

export const dynamic = "force-dynamic"

export default async function Orientation() {
  const orientation = await getOrientation()
  if (!orientation) {
    notFound()
  }
  return <OrientationPage orientation={orientation} />
}
