"use client"

import { Filiere } from "@/strapi/filieres"
import styles from "./Filieres.module.css"
import FiliereCard from "./FiliereCard"

const Filieres = ({ filieres }: { filieres: Filiere[] }) => {
  return (
    <>
      <h1 className={styles.title}>Découvrir les différentes filières de l'artisanat et du patrimoine</h1>
      <div className={styles.filieres}>
        {filieres.map((filiere) => (
          <FiliereCard key={filiere.id} filiere={filiere} />
        ))}
      </div>
    </>
  )
}

export default Filieres
