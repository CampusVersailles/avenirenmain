import Link from "next/link"
import styles from "./Breadcrumbs.module.css"
import classNames from "classnames"

const Breadcrumbs = ({
  items,
}: {
  items: {
    label: string
    href: string
  }[]
}) => {
  return (
    <nav aria-label="Fil d'Ariane" className={classNames("main-container", styles.breadcrumbs)}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current='page'>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                  <span aria-hidden='true'>/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
