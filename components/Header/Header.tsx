"use client"

import SkipLinks from "./SkipLinks"
import styles from "./Header.module.css"
import Image from "next/image"
import Link from "next/link"
import Menu from "./Menu"
import { usePathname } from "next/navigation"
import classNames from "classnames"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className={styles.header} role='banner' aria-label='En-tête' id='header-navigation'>
      <SkipLinks />
      <div className='main-container'>
        <div className={styles.container}>
          <Link href='/' title="Accueil de l'avenir en main">
            <Image src='/images/logo.svg' alt='' width={70} height={70} />
          </Link>
          <nav role='navigation' tabIndex={-1} aria-label='Menu principal'>
            <ul className={styles.links}>
              <li>
                <Link
                  className={classNames(styles.link, { [styles.active]: pathname.startsWith("/metiers") })}
                  href='/metiers'
                  aria-current={pathname.startsWith("/metiers") ? "page" : undefined}>
                  Métiers
                </Link>
              </li>
              <li>
                <Link
                  className={classNames(styles.link, { [styles.active]: pathname.startsWith("/formations") })}
                  href='/formations'
                  aria-current={pathname.startsWith("/formations") ? "page" : undefined}>
                  Formations
                </Link>
              </li>
              <li>
                <Link className={styles.linkButton} href='/test'>
                  Je passe le test
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.menu}>
            <Menu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
