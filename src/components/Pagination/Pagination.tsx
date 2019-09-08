import React from "react"
import _ from "lodash"
import { Icon } from "antd"
import classNames from "classnames"
import * as styles from "./Pagination.module.scss"

interface PaginationProps {
  page: number
  totalPages: number
  onClick(n: number): void
}

const BUTTON_COUNT = 10

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onClick,
}) => {
  const first = page - BUTTON_COUNT < 1 ? 1 : page - BUTTON_COUNT
  const last = first + BUTTON_COUNT + 1
  return (
    <div className={styles.pagination}>
      <div className={styles.buttons}>
        {page > 1 && (
          <li onClick={() => onClick(page - 1)}>
            <div className={classNames(styles.button, styles.selectable)}>
              <span>
                <Icon type="left" />
              </span>
            </div>
          </li>
        )}
        {_.range(first, last).map(it => (
          <li key={it} onClick={() => it !== page && onClick(it)}>
            <div
              className={classNames(
                styles.button,
                page === it ? styles.active : styles.selectable
              )}
            >
              <span>{it}</span>
            </div>
          </li>
        ))}
        {page < totalPages && (
          <li onClick={() => onClick(page + 1)}>
            <div className={classNames(styles.button, styles.selectable)}>
              <span>
                <Icon type="right" />
              </span>
            </div>
          </li>
        )}
      </div>
    </div>
  )
}
