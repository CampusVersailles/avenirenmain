import { FiliereAvecMetiers } from "@/strapi/filieres"
import { Metier as MetierType } from "@/strapi/metiers"
import styles from "./MetierTrouverFormation.module.css"
import Link from "next/link"
import ArrowDownRightIcon from "../Icons/ArrowDownRightIcon"

export default function MetierTrouverFormation({
  filiere,
  metier,
}: {
  filiere: FiliereAvecMetiers
  metier: MetierType
}) {
  return (
    <div className={styles.container}>
      <ArrowDownRightIcon className={styles.arrow} />
      <Link className={styles.button} href={`/formations`}>
        <p className={styles.buttonText}>Trouver sa formation</p>
      </Link>
    </div>
  )
}
