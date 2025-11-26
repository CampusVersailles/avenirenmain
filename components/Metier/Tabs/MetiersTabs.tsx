"use client"

import React, { useRef, useState, KeyboardEvent } from "react"
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
  ariaLabel?: string
}

export default function MetiersTabs(tabsProps: TabsProps) {
  const { tabs, defaultActiveId, className = "", ariaLabel } = tabsProps
  const initialId = defaultActiveId || tabs[0]?.id
  const [activeId, setActiveId] = useState(initialId)

  const activeTab = tabs.find((tab) => tab.id === activeId)
  const activePanelId = activeTab ? `${activeTab.id}-panel` : undefined

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const { key } = event
    let nextIndex: number | null = null

    switch (key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % tabs.length
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + tabs.length) % tabs.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = tabs.length - 1
        break
      case " ":
      case "Enter":
        setActiveId(tabs[index].id)
        return
      default:
        return
    }

    if (nextIndex !== null) {
      event.preventDefault()
      const nextTab = tabs[nextIndex]
      setActiveId(nextTab.id)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className={styles.tabsRoot + " " + className}>
      <div className={styles.tabsHeader} role='tablist' aria-label={ariaLabel}>
        {tabs.map((tab, index) => {
          const tabId = `${tab.id}-tab`
          const panelId = `${tab.id}-panel`
          const isActive = activeId === tab.id

          return (
            <button
              key={tab.id}
              id={tabId}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={styles.tabsButton + (isActive ? " " + styles.tabsButtonActive : "")}>
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab && (
        <div
          id={activePanelId}
          role='tabpanel'
          aria-labelledby={`${activeTab.id}-tab`}
          className={styles.tabsBody}
          tabIndex={0}>
          {activeTab.component}
        </div>
      )}
    </div>
  )
}
