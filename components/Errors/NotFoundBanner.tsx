import Link from "next/link"
import ErrorIcon from "../Icons/Error"
import styles from "./NotFoundBanner.module.css"

export default function NotFoundBanner() {
  return (
    <div className={styles.banner}>
      <h1>Page non trouvée</h1>

      <div className={styles.container}>
        <ErrorIcon className={styles.icon} />
        <div className={styles.verticalSeparator} />
        <p>
          Cette page n'existe pas, veuillez <Link href='/'>retourner à l'accueil</Link>.
        </p>
      </div>
    </div>
  )
}
