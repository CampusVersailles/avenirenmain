import classNames from "classnames"
import Link from "next/link"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer id='footer' role='contentinfo' tabIndex={-1}>
      <div className={classNames("main-container", styles.footer)}>
        Propulsé par{" "}
        <Link prefetch={false} href='' target='_blank' rel='noreferrer noopener'>
          le campus Versailles
        </Link>{" "}
        avec le soutien de France 2030
      </div>
    </footer>
  )
}

export default Footer
