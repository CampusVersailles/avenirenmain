"use client"
import LeftChevronIcon from "../Icons/LeftChevron"
import styles from "./BackButton.module.css"
import { useRouter } from "next/navigation"

const BackButton = ({ fallbackHref }: { fallbackHref: string }) => {
  const router = useRouter()
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (window.history.length > 1) router.back()
        else router.push(fallbackHref)
      }}
      aria-label='Retour'>
      <LeftChevronIcon className={styles.icon} />
    </button>
  )
}
export default BackButton
