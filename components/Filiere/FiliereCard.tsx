"use client"

import { Filiere } from "@/strapi/filieres"
import styles from "./Filieres.module.css"
import Video from "../Video/Video"
import Link from "next/link"
import { useRef } from "react"

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
        <p className={styles.badge}>{filiere.nom}</p>
        <p className={styles.title}>{filiere.titre}</p>
      </div>
    </Link>
  )
}

export default FiliereCard
