import SkipLinks from "./SkipLinks"
import styles from "./Header.module.css"
import Image from "next/image"
import Link from "next/link"
import Menu from "./Menu"

const Header = () => {
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
                <Link className={styles.link} href='/metiers'>
                  Métiers
                </Link>
              </li>
              <li>
                <Link className={styles.link} href='/formations'>
                  Formations
                </Link>
              </li>
              <li>
                <Link className={styles.link} href='/test'>
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
