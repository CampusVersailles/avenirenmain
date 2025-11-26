"use client"

import React, { useState } from "react"
import styles from "./MetiersTabs.module.css"

export interface TabItem {
  id: string
  label: string
  component: React.ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  defaultActiveId?: string
  className?: string
}

export default function MetiersTabs(tabsProps: TabsProps) {
  const { tabs, defaultActiveId, className = "" } = tabsProps
  const initialId = defaultActiveId || tabs[0]?.id
  const [activeId, setActiveId] = useState(initialId)
  const activeTab = tabs.find((tab) => tab.id === activeId)

  return (
    <div className={styles.tabsRoot + " " + className}>
      <div className={styles.tabsHeader} role='tablist'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={activeId === tab.id}
            onClick={() => setActiveId(tab.id)}
            className={styles.tabsButton + (activeId === tab.id ? " " + styles.tabsButtonActive : "")}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabsBody} role='tabpanel'>
        {activeTab?.component}
      </div>
    </div>
  )
}
