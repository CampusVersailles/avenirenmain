import { getOrientation } from "@/strapi/orientation"
import OrientationPage from "@/views/OrientationPage"

export default async function Orientation() {
  const orientation = await getOrientation()
  return <OrientationPage orientation={orientation} />
}
