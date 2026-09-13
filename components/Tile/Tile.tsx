import Link from "next/link"
import { ReactNode } from "react"
import styles from "./Tile.module.css"
import classNames from "classnames"

interface TileProps {
  href: string
  children: ReactNode
  className?: string
  disabled?: boolean
  external?: boolean
}

const Tile = ({ href, children, className, disabled, external }: TileProps) => {
  return (
    <Link
      href={href}
      className={classNames(styles.tile, className, { [styles.disabled]: disabled })}
      aria-disabled={disabled}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}>
      {children}
    </Link>
  )
}

export default Tile
