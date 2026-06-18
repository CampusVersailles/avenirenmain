"use client"
import { Filiere } from "@/strapi/filieres"
import styles from "./FiliereCard.module.css"
import Link from "next/link"
import Image from "next/image"

const FiliereCard = ({ filiere, secondary, link }: { filiere: Filiere; secondary?: boolean; link: string }) => {
  const badge = (
    <p className={secondary ? styles.badgeSecondary : styles.badge}>
      {filiere.icone && <Image src={filiere.icone.url} alt='' width={24} height={24} />}
      {filiere.nom}
    </p>
  )
  return (
    <Link className={styles.filiere} href={link}>
      {filiere.photo && <Image src={filiere.photo.url} alt='' height={400} width={250} className={styles.image} />}
      <div className={styles.overlay}></div>
      {secondary && badge}
      <div className={styles.content}>
        {!secondary && badge}
        <p className={styles.title}>{filiere.titre}</p>
      </div>
    </Link>
  )
}

export default FiliereCard
