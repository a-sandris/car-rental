import React from "react"
import { storiesOf } from "@storybook/react"
import { Filter } from "./Filter"
import { Supplier } from "../../types"

const suppliers = [
  {
    id: "27000",
    name: "SurPrice Cars ",
    rating: 0,
  },
  {
    id: "68000",
    name: "Guerin ",
    rating: 0,
  },
  {
    id: "17000",
    name: "Hertz ",
    rating: 0,
  },
  {
    id: "12",
    name: "SIXT ",
    rating: 0,
  },
  {
    id: "104000",
    name: "Guerin Premium ",
    rating: 0,
  },
  {
    id: "15",
    name: "Europcar ",
    rating: 0,
  },
] as Supplier[]

const props = {
  onSelect: (supplier: string) => null,
  onRemove: (supplier: string) => null,
  onClear: () => null,
}

storiesOf("Filter", module)
  .add("none selected", () => <Filter suppliers={suppliers} {...props} />)
  .add("few selected", () => (
    <Filter
      suppliers={suppliers}
      filtersApplied={["addCar", "sixt"]}
      {...props}
    />
  ))
