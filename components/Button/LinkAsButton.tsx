import styles from "./LinkAsButton.module.css"
import Link, { LinkProps } from "next/link"
import classNames from "classnames"
import { AnchorHTMLAttributes } from "react"

const LinkAsButton = ({
  secondary,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { secondary?: boolean }) => {
  return (
    <Link {...props} className={classNames(styles.linkButton, { [styles.secondary]: secondary }, props.className)} />
  )
}

export default LinkAsButton
