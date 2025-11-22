import Link from "next/link"
import { ReactNode } from "react"
import styles from "./Tile.module.css"
import classNames from "classnames"

interface TileProps {
  href: string
  children: ReactNode
  className?: string
}

const Tile = ({ href, children, className }: TileProps) => {
  return (
    <Link href={href} className={classNames(styles.tile, className)}>
      {children}
    </Link>
  )
}

export default Tile
