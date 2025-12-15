"use client"

import { FiliereAvecMetiers } from "@/strapi/filieres"
import styles from "./Filieres.module.css"
import FiliereCard from "./FiliereCard"
import Search from "../Search/Search"

const Filieres = ({ filieres }: { filieres: FiliereAvecMetiers[] }) => {
  return (
    <>
      <h1 className={styles.title}>Découvrir les différentes filières de l'artisanat et du patrimoine</h1>
      <div className={styles.searchContainer}>
        <Search filieres={filieres} />
      </div>
      <div className={styles.filieres}>
        {filieres.map((filiere) => (
          <FiliereCard key={filiere.id} filiere={filiere} />
        ))}
      </div>
    </>
  )
}

export default Filieres
