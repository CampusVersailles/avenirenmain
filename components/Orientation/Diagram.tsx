"use client"

import Image from "next/image"
import { useState } from "react"
import styles from "./Diagram.module.css"

const Diagram = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={styles.diagramme} onClick={() => setOpen(true)} role='button' aria-label='Agrandir le diagramme'>
        <Image src={imageUrl} alt={alt} width={1280} height={720} className={styles.diagrammeImage} />
      </div>

      {open && (
        <div className={styles.diagrammeModal} onClick={() => setOpen(false)}>
          <div className={styles.diagrammeModalContent}>
            <Image src={imageUrl} alt={alt} width={1280} height={720} className={styles.diagrammeModalImage} />
          </div>
        </div>
      )}
    </>
  )
}
export default Diagram
