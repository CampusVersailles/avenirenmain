import { getPartenaires } from "@/strapi/partenaires"
import PartenairesPage from "@/views/PartenairesPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Qui sommes-nous ? | L’Avenir en Main",
}

export const revalidate = 3600

export default async function Partenaires() {
  const partenaires = await getPartenaires()
  return <PartenairesPage partenaires={partenaires} />
}
