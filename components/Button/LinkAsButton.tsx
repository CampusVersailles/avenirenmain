import styles from "./LinkAsButton.module.css"
import Link, { LinkProps } from "next/link"
import classNames from "classnames"
import { AnchorHTMLAttributes } from "react"

const LinkAsButton = ({
  priority,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { priority?: "secondary" | "tertiary" }) => {
  return (
    <Link
      {...props}
      className={classNames(
        styles.linkButton,
        { [styles.secondary]: priority === "secondary", [styles.tertiary]: priority === "tertiary" },
        props.className,
      )}
    />
  )
}

export default LinkAsButton
