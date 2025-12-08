import Link from "next/link"
import styles from "./ConfirmationReferencement.module.css"
import CirclePlusIcon from "@/components/Icons/CirclePlusIcon"
import classNames from "classnames"

const ConfirmationReferencement = () => {
  return (
    <div className={styles.container}>
      <h1>Confirmation de référencement</h1>
      <p className={styles.description}>
        Votre demande de référencement a été envoyée avec succès et l'équipe de l'Avenir en Main va la valider dans les
        plus brefs délais.
      </p>
      <div className={styles.buttons}>
        <Link href='/formations/referencer' className={classNames(styles.button, styles.secondary)}>
          Référencer une autre formation
          <CirclePlusIcon className={styles.icon} />
        </Link>
        <Link href='/' className={styles.button}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default ConfirmationReferencement
