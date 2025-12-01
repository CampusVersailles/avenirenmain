"use client"
import { Filiere } from "@/strapi/filieres"
import styles from "./FiliereCard.module.css"
import Link from "next/link"
import Image from "next/image"

const FiliereCard = ({ filiere }: { filiere: Filiere }) => {
  return (
    <Link className={styles.filiere} href={`/metiers/${filiere.documentId}`}>
      <Image src={filiere.photo} alt='' height={400} width={250} className={styles.image} />
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
