"use client"

import { useRef, useState } from "react"
import { FichePratiqueDetailStrapi } from "@/strapi/ressources"
import styles from "./FichePratiquePdfExport.module.css"

const FichePratiquePdfExport = ({ fiche }: { fiche: FichePratiqueDetailStrapi }) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const rewriteImagesForPdf = (container: ParentNode) => {
    const origin = window.location.origin
    const images = Array.from(container.querySelectorAll("img"))

    images.forEach((img) => {
      const currentSrc = img.getAttribute("src")
      if (!currentSrc) {
        return
      }

      if (currentSrc.startsWith("data:") || currentSrc.startsWith("blob:")) {
        return
      }

      let absoluteUrl: URL
      try {
        absoluteUrl = new URL(currentSrc, origin)
      } catch {
        return
      }

      if (absoluteUrl.origin === origin) {
        return
      }

      const proxied = `${origin}/api/image-proxy?url=${encodeURIComponent(absoluteUrl.toString())}`
      img.setAttribute("src", proxied)
    })
  }

  const waitForImages = async (container: ParentNode) => {
    const images = Array.from(container.querySelectorAll("img"))
    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve()
              return
            }
            img.addEventListener("load", () => resolve(), { once: true })
            img.addEventListener("error", () => resolve(), { once: true })
          }),
      ),
    )
  }

  const handleDownloadPdf = async () => {
    if (isExportingPdf) {
      return
    }

    setIsExportingPdf(true)

    try {
      const html2pdfModule = await import("html2pdf.js/dist/html2pdf.min.js")
      const html2pdf = (html2pdfModule.default || html2pdfModule) as {
        (): {
          set: (options: Record<string, unknown>) => {
            from: (element: HTMLElement) => {
              save: () => Promise<void>
            }
          }
        }
      }

      const safeTitle = fiche.titre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase()

      const filename = `${safeTitle || "fiche-pratique"}.pdf`

      const printUrl = `${window.location.origin}/fiches-pratiques/${fiche.documentId}/print`
      const iframe = document.createElement("iframe")
      iframe.src = printUrl
      iframe.style.position = "fixed"
      iframe.style.width = "900px"
      iframe.style.height = "1200px"
      iframe.style.border = "0"
      iframe.style.opacity = "0"
      iframe.style.left = "0"
      iframe.style.top = "0"
      iframe.style.zIndex = "-1"
      iframe.style.pointerEvents = "none"
      iframeRef.current = iframe
      document.body.appendChild(iframe)

      await new Promise<void>((resolve, reject) => {
        const timeoutId = window.setTimeout(() => reject(new Error("Timeout chargement page PDF")), 20000)
        iframe.onload = () => {
          window.clearTimeout(timeoutId)
          resolve()
        }
        iframe.onerror = () => {
          window.clearTimeout(timeoutId)
          reject(new Error("Erreur chargement page PDF"))
        }
      })

      const iframeDocument = iframe.contentDocument
      const source = iframeDocument?.getElementById("fiche-pdf-root")

      if (!source) {
        throw new Error("Contenu PDF introuvable")
      }

      try {
        if (iframeDocument?.fonts?.ready) {
          await iframeDocument.fonts.ready
        }
        rewriteImagesForPdf(source)

        const paragraphs = Array.from(source.querySelectorAll("p"))
        paragraphs.forEach((paragraph) => {
          paragraph.style.setProperty("text-align", "justify", "important")
          paragraph.style.setProperty("line-height", "1.6", "important")
        })

        await waitForImages(source)
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

        await html2pdf()
          .set({
            margin: 10,
            filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: {
              mode: ["css", "legacy"],
              avoid: ["img", "p", "li", "blockquote", ".callout", ".testimonial", ".figure"],
            },
          })
          .from(source)
          .save()
      } finally {
        iframeRef.current?.remove()
        iframeRef.current = null
      }
    } catch (error) {
      // Keep this log for support diagnostics if browser-side PDF generation fails.
      console.error("Erreur pendant la generation du PDF", error)
      iframeRef.current?.remove()
      iframeRef.current = null
    } finally {
      setIsExportingPdf(false)
    }
  }

  return (
    <button className={styles.downloadButton} onClick={handleDownloadPdf} disabled={isExportingPdf}>
      {isExportingPdf ? "Generation du PDF..." : "Telecharger la fiche en PDF"}
    </button>
  )
}

export default FichePratiquePdfExport
