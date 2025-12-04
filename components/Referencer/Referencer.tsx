"use client"

import { type Option } from "@/strapi/formations"
import styles from "./Referencer.module.css"

const Referencer = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
  return (
    <div className={styles.container}>
      <h1>Référencer une formation</h1>
    </div>
  )
}

export default Referencer
