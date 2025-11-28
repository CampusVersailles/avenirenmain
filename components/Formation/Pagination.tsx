interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

import classNames from "classnames"
import styles from "./Pagination.module.css"

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.pageButton} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Précédent
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            className={classNames(styles.pageButton, { [styles.active]: currentPage === page })}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}>
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className={styles.pageInfo}>
            {page}
          </span>
        ),
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Suivant
      </button>
    </div>
  )
}

export default Pagination
