import { Metier as MetierType } from "@/strapi/metiers"
import styles from "./MetierTrouverFormation.module.css"
import Link from "next/link"
import ArrowDownRightIcon from "../Icons/ArrowDownRightIcon"

export default function MetierTrouverFormation({ metier }: { metier: MetierType }) {
  return metier.codeRomeMetier ? (
    <div className={styles.container}>
      <ArrowDownRightIcon className={styles.arrow} />
      <Link className={styles.button} href={`/formations?romeCode=${encodeURIComponent(metier.codeRomeMetier.code)}`}>
        <p className={styles.buttonText}>Trouver sa formation</p>
      </Link>
    </div>
  ) : null
}
