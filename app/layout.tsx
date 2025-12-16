import type { Metadata } from "next"
import { Poppins, Josefin_Slab } from "next/font/google"
import "../css/reset.css"
import "../css/variables.css"
import "../css/global.css"
import Header from "@/components/Header/Header"
import Script from "next/script"
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider"
import CookieBanner from "@/components/Cookies/CookieBanner"
import { Suspense } from "react"

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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id='gtag-consent'
              strategy='beforeInteractive'
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var __consent = 'denied';
try { 
  var stored = localStorage.getItem('analytics_consent');
  if (stored === 'granted') __consent = 'granted';
} catch(e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: __consent,
  functionality_storage: 'granted',
  security_storage: 'granted'
});
`,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy='afterInteractive'
            />
            <Script
              id='gtag-init'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
(function(){
  var granted = false;
  try {
    var stored = localStorage.getItem('analytics_consent');
    if (stored === 'granted') granted = true;
  } catch(e) {}
  var cfg = {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  };
  if (!granted) { cfg.storage = 'none'; }
  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', cfg);
})();
`,
              }}
            />
          </>
        )}
        <Header />
        <main id='contenu' role='main' tabIndex={-1}>
          <Suspense>
            <AnalyticsProvider />
          </Suspense>
          {children}
        </main>
        <CookieBanner />
      </body>
    </html>
  )
}
