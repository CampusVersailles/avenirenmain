import Link from "next/link"
import styles from "./FormationsHeader.module.css"
import CirclePlusIcon from "@/components/Icons/CirclePlusIcon"

export default function FormationsHeader() {
  return (
    <div className={styles.container}>
      <h1>Les formations</h1>
      <Link href='/formations/referencer' className={styles.button}>
        Référencer ma formation
        <CirclePlusIcon className={styles.icon} />
      </Link>
    </div>
  )
}
