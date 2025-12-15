import type { Metadata } from "next"
import { Poppins, Josefin_Slab } from "next/font/google"
import "../css/reset.css"
import "../css/variables.css"
import "../css/global.css"
import Header from "@/components/Header/Header"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const josefinSlab = Josefin_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-slab",
  display: "swap",
})

export const metadata: Metadata = {
  title: "L’Avenir en Main",
  description:
    "Plus de 140 métiers d’artisanat et du patrimoine à découvrir : restauration, design, jardins, gastronomie, tourisme… Trouve ta vocation avec notre quiz et une formation partout en France.",
  openGraph: {
    title: "Explore les métiers de l’artisanat et trouve ta formation | L’Avenir en Main",
    creators: "L’Avenir en Main",
    images: `${process.env.NEXT_PUBLIC_URL}/meta/og.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fr' className={`${poppins.variable} ${josefinSlab.variable}`}>
      <body>
        <Header />
        <main id='contenu' role='main' tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  )
}
