import Link from "next/link"
import { ReactNode } from "react"
import styles from "./Tile.module.css"
import classNames from "classnames"

interface TileProps {
  href: string
  children: ReactNode
  className?: string
  disabled?: boolean
}

const Tile = ({ href, children, className, disabled }: TileProps) => {
  return (
    <Link
      href={href}
      className={classNames(styles.tile, className, { [styles.disabled]: disabled })}
      aria-disabled={disabled}>
      {children}
    </Link>
  )
}

export default Tile
