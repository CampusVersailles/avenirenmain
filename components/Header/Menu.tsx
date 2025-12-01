"use client"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import styles from "./Menu.module.css"
import headerStyles from "./Header.module.css"
import Link from "next/link"
import MenuIcon from "../Icons/MenuIcon"
import { usePathname } from "next/navigation"

const Menu = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClick, true)
    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen(!open)}
        title='Menu'
        aria-expanded={open}
        aria-controls='mobile-menu'
        className={headerStyles.link}>
        <MenuIcon />
        <span>Menu</span>
      </button>
      <ul className={classNames(styles.menu, { [styles.open]: open })} id='mobile-menu'>
        <li>
          <Link
            className={classNames(headerStyles.link, { [headerStyles.active]: pathname.startsWith("/metiers") })}
            href='/metiers'
            aria-current={pathname.startsWith("/metiers") ? "page" : undefined}>
            Métiers
          </Link>
        </li>
        <li>
          <Link
            className={classNames(headerStyles.link, { [headerStyles.active]: pathname.startsWith("/formations") })}
            href='/formations'
            aria-current={pathname.startsWith("/formations") ? "page" : undefined}>
            Formations
          </Link>
        </li>
        <li>
          <Link className={headerStyles.link} href='/quiz'>
            Je passe le test
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Menu
