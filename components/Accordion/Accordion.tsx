"use client"

import { useState, ReactNode } from "react"
import styles from "./Accordion.module.css"
import DownChevronIcon from "@/components/Icons/DownChevron"
import classNames from "classnames"
import GridIcon from "../Icons/GridIcon"

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.accordion}>
      <button className={styles.header} onClick={toggleAccordion} aria-expanded={isOpen}>
        <div className={styles.titleContainer}>
          <GridIcon />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <DownChevronIcon className={classNames(styles.icon, { [styles.open]: isOpen })} />
      </button>
      <div className={classNames(styles.content, { [styles.open]: isOpen })}>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
