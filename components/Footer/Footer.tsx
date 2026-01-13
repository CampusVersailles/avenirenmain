import classNames from "classnames"
import Link from "next/link"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer id='footer' role='contentinfo' tabIndex={-1} className={styles.footer}>
      <ul className={classNames("main-container", styles.container)}>
        <li>
          <Link href='/a-propos'>À propos</Link>
        </li>
        <li>
          <Link href='/qui-sommes-nous'>Qui sommes-nous</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
