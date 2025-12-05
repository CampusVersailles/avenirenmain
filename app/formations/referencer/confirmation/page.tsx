import ConfirmationPage from "@/views/ConfirmationPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confirmation de référencement | L’Avenir en Main",
}

export default async function Confirmation() {
  return <ConfirmationPage />
}
