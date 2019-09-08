import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { PageRendererProps, navigate } from "gatsby"
import queryString from "query-string"
import { Row, Col, Menu, Dropdown, Button, Spin, Icon } from "antd"
import classNames from "classnames"
import { logo } from "../logo"
import { Header, Filter, CarInfoCard, Pagination } from "../components"
import * as styles from "./Index.module.scss"
import { Supplier, Car } from "../types"

const FETCH_CARS = gql`
  query($req: PageRequest!, $companies: [String!], $sort: Sort!) {
    cars: fetchCars(req: $req, companies: $companies, sort: $sort) {
      page
      totalPages
      totalItems
      items {
        id
        name
        imageUrl
        seats
        doors
        airConditioningPresent
        categories
        transmission
        bagagge {
          small
          big
        }
        price {
          total
          currency
        }
        supplier {
          id
          name
          rating
        }
      }
    }
  }
`

const FETCH_SUPPLIERS = gql`
  query {
    suppliers {
      id
      name
      rating
    }
  }
`

interface Data {
  cars: {
    page: number
    totalPages: number
    totalItems: number
    items: Car[]
  }
}

type Sort = "Asc" | "Desc"
const PAGE_SIZE = 10

class UrlState {
  sort: Sort
  page: number
  companies: string[]

  constructor(search: string) {
    const queryParams = queryString.parse(search)
    this.sort = queryParams.sort && queryParams.sort === "Desc" ? "Desc" : "Asc"
    this.page =
      queryParams.page && typeof queryParams.page === "string"
        ? parseInt(queryParams.page)
        : 1
    this.companies =
      queryParams.companies && typeof queryParams.companies === "string"
        ? queryParams.companies.split(",")
        : []
  }

  addCompany(company: string): UrlState {
    const i = this.companies.indexOf(company)
    if (i > -1) {
      return this
    }
    this.companies.push(company)
    return this
  }

  removeCompany(company: string): UrlState {
    const i = this.companies.indexOf(company)
    if (i > -1) {
      this.companies.splice(i, 1)
      return this
    }
    return this
  }

  clearCompanies() {
    this.companies = []
    return this
  }

  setSort(sort: Sort) {
    this.sort = sort
    return this
  }

  setPage(page: number) {
    this.page = page
    return this
  }

  asSearch() {
    let result = "?sort=" + this.sort
    if (this.companies.length > 0) {
      result += "&companies=" + this.companies.join(",")
    }
    if (this.page > 0) {
      result += "&page=" + this.page
    }
    return result
  }

  asVariables() {
    console.log(this.page)
    return {
      req: {
        offset: PAGE_SIZE * (this.page - 1),
        limit: PAGE_SIZE,
      },
      companies: this.companies,
      sort: this.sort,
    }
  }
}

const loader = <Icon type="loading" style={{ fontSize: 24 }} spin />

interface FilterPanelData {
  suppliers: Supplier[]
}

interface FilterPanelProps {
  filtersApplied: string[]
  addCompany(company: string): void
  removeCompany(company: string): void
  clear(): void
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filtersApplied,
  addCompany,
  removeCompany,
  clear,
}) => {
  const { loading, data } = useQuery<FilterPanelData>(FETCH_SUPPLIERS)
  if (loading || !data) {
    return loader
  }
  return (
    <Filter
      suppliers={data.suppliers}
      filtersApplied={filtersApplied}
      onSelect={addCompany}
      onRemove={removeCompany}
      onClear={clear}
    />
  )
}

export default (props: PageRendererProps) => {
  const state = new UrlState(props.location.search)
  const { data, refetch } = useQuery<Data>(FETCH_CARS, {
    variables: state.asVariables(),
  })
  const onStateChange = (state: UrlState) => {
    refetch(state.asVariables()).then(() =>
      navigate(state.asSearch(), { replace: false })
    )
  }
  const menu = (
    <Menu onClick={({ key }) => onStateChange(state.setSort(key as Sort))}>
      <Menu.Item key={"Asc"}>Price (low - high)</Menu.Item>
      <Menu.Item key={"Desc"}>Price (high - low)</Menu.Item>
    </Menu>
  )
  return (
    <div>
      <Header />
      <div className={classNames("container", styles.content)}>
        <FilterPanel
          filtersApplied={state.companies}
          addCompany={it => onStateChange(state.addCompany(it.trim()))}
          removeCompany={it => onStateChange(state.removeCompany(it.trim()))}
          clear={() => onStateChange(state.clearCompanies())}
        />
        {!data ? (
          loader
        ) : (
          <div>
            <Row className={styles.info}>
              <Col span={6}>
                <h1>
                  <span className={styles.totalItems}>
                    {data.cars.totalItems}
                  </span>{" "}
                  results
                </h1>
              </Col>
              <Col span={18} className={styles.sortContainer}>
                <div className={styles.sort}>
                  <span className={styles.title}>Sort:</span>
                  <Dropdown overlay={menu} placement="bottomRight">
                    <Button>
                      {state.sort === "Asc"
                        ? "Price (low - high)"
                        : "Price (high - low)"}
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row>
            {data.cars.items.map(car => (
              <div key={car.id} className={styles.car}>
                <CarInfoCard car={car} />
              </div>
            ))}
            <div className={styles.pagination}>
              <Pagination
                page={state.page}
                totalPages={data.cars.totalPages}
                onClick={n => onStateChange(state.setPage(n))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
