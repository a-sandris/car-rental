import React from "react"
import { Row, Col, Card, Skeleton } from "antd"
import { Car } from "../../types"
import { logo } from "../../logo"
import { formatCurrency } from "../../currencies"
import * as styles from "./CarInfoCard.module.scss"
import placeholder from "./car-placeholder.png"

interface CardProps {
  car: Car
}

export const CarInfoCard: React.FC<CardProps> = ({ car }: CardProps) => (
  <div>
    <Card bodyStyle={{ padding: 0 }} className={styles.card}>
      <Row
        className={styles.rowMain}
        type="flex"
        justify="space-around"
        align={"middle"}
      >
        <Col span={6}>
          <img src={car.imageUrl ? car.imageUrl : placeholder} />
        </Col>
        <Col span={12}>
          <div className={styles.modelContainer}>
            <span className={styles.model}>{car.name}</span>{" "}
            <span className={styles.similar}>or similar</span>
          </div>
          <span className={styles.category}>{car.categories.join(", ")}</span>
          <div className={styles.options}>
            {car.airConditioningPresent && (
              <span className={styles.item}>Air Conditioning</span>
            )}
            {car.transmission === "Automatic" && (
              <span className={styles.item}>Automatic Transmission</span>
            )}
          </div>
          <div className={styles.characteristics}>
            <span className={styles.item}>{car.seats} Seats</span>
            {car.doors && (
              <span className={styles.item}>{car.doors} Doors</span>
            )}
            {car.bagagge.small > 0 && car.bagagge.big > 0 && (
              <span className={styles.item}>Bagagge</span>
            )}
          </div>
        </Col>
        <Col span={6} className={styles.priceColumn}>
          <span>
            {formatCurrency(car.price.currency)} {car.price.total.toFixed(2)}
          </span>
        </Col>
      </Row>
      <Row className={styles.rowSupplier}>
        <Col span={2}>
          <img alt={car.supplier.name} src={logo(car.supplier.name)} />
        </Col>
        <Col span={4} className={styles.score}>
          {car.supplier.rating} <span className={styles.max}>/ 10</span>
        </Col>
      </Row>
    </Card>
  </div>
)
