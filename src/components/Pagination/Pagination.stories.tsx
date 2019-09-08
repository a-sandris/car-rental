import React from "react"
import { storiesOf } from "@storybook/react"
import { Pagination } from "./Pagination"

storiesOf("Pagination", module)
  .add("default", () => (
    <Pagination page={1} totalPages={18} onClick={() => null} />
  ))
  .add("in the middle", () => (
    <Pagination page={7} totalPages={18} onClick={() => null} />
  ))
  .add("at the end", () => (
    <Pagination page={18} totalPages={18} onClick={() => null} />
  ))
