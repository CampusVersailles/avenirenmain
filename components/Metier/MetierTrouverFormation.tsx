import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metier"
import styles from "./MetierTrouverFormation.module.css"
import Link from "next/link"
import ArrowRightIcon from "../Icons/ArrowRightIcon"

export default function MetierTrouverFormation({
  filiere,
  metier,
}: {
  filiere: FiliereAvecMetiers
  metier: MetierType
}) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Ce métier vous intéresse ?</p>
      <Link className={styles.button} href={`/formations`}>
        <p className={styles.buttonText}>Trouver sa formation</p>
        <ArrowRightIcon />
      </Link>
    </div>
  )
}
