import React from "react"
import { Row, Col } from "antd"
import { Link } from "gatsby"
import * as styles from "./Header.module.scss"

export const Header: React.FC = () => (
  <div className={styles.header}>
    <div className={"container"}>
      <Row>
        <Col span={6} className={styles.logo}>
          <Link title={"EconomyBookings"} className={styles.navLink} to={"/"} />
        </Col>
      </Row>
    </div>
  </div>
)
