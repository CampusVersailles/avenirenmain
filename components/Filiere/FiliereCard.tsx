"use client"

import { Filiere } from "@/strapi/filieres"
import styles from "./Filieres.module.css"
import Video from "../Video/Video"
import Link from "next/link"
import { useRef } from "react"
import Image from "next/image"

const FiliereCard = ({ filiere }: { filiere: Filiere }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <Link
      className={styles.filiere}
      href={`/metiers/${filiere.id}`}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}>
      <Video ref={videoRef} src={filiere.video} onMouseEnter={() => {}} onMouseLeave={() => {}} />
      <div className={styles.content}>
        <p className={styles.badge}>
          <Image src={filiere.icone} alt='' width={24} height={24} />
          {filiere.nom}
        </p>
        <p className={styles.title}>{filiere.titre}</p>
      </div>
    </Link>
  )
}

export default FiliereCard
