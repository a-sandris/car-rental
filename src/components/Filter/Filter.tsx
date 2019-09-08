import React, { useState } from "react"
import ReactIdSwiper, {
  SwiperInstance,
  ReactIdSwiperProps,
} from "react-id-swiper"
import { Row, Col, Icon } from "antd"
import classNames from "classnames"
import * as styles from "./Filter.module.scss"
import { Supplier } from "../../types"
import { logo } from "../../logo"

interface FilterProps {
  suppliers: Supplier[]
  filtersApplied?: string[]
  onSelect(supplier: string): void
  onRemove(supplier: string): void
  onClear(): void
}

export const Filter: React.FC<FilterProps> = ({
  suppliers,
  onSelect,
  filtersApplied = [],
  onRemove,
  onClear,
}) => {
  const [swiper, setSwiper] = useState<SwiperInstance>(null)

  const params: ReactIdSwiperProps = {
    containerClass: styles.suppliers,
    getSwiper: setSwiper,
    slidesPerView: "auto",
  }

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  return (
    <div className={styles.filter}>
      <Row>
        <Col span={24}>
          <div className={styles.list}>
            <span
              className={classNames(styles.navBtn, styles.left, styles.active)}
              onClick={goPrev}
            >
              <Icon type="left" />
            </span>
            <ReactIdSwiper {...params}>
              {suppliers!.map(it => (
                <div
                  key={it.name}
                  className={styles.supplier}
                  onClick={() => onSelect(it.name)}
                >
                  <img src={logo(it.name)} />
                </div>
              ))}
            </ReactIdSwiper>
            <span
              className={classNames(styles.navBtn, styles.right, styles.active)}
              onClick={goNext}
            >
              <Icon type="right" />
            </span>
          </div>
        </Col>
      </Row>
      {filtersApplied.length > 0 && (
        <Row className={styles.filters}>
          <Col span={18}>
            <span className={styles.title}>Filters applied:</span>{" "}
            {filtersApplied.map(it => (
              <span
                key={it}
                className={styles.item}
                onClick={() => onRemove(it)}
              >
                {it}{" "}
                <span className={styles.circle}>
                  <Icon type="close-circle" />
                </span>
              </span>
            ))}
          </Col>
          <Col span={6} className={styles.clearContainer}>
            <span className={styles.clear} onClick={onClear}>
              Clear All
            </span>
          </Col>
        </Row>
      )}
    </div>
  )
}
