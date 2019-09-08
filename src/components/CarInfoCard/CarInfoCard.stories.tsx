import React from "react"
import { storiesOf } from "@storybook/react"
import { CarInfoCard } from "./CarInfoCard"
import { Car } from "../../types"

storiesOf("CarInfoCard", module).add("default", () => {
  const car = {
    id: "AH_H_1472120_1472120____1",
    name: "Toyota Yaris",
    imageUrl:
      "https://drav57q5to86r.cloudfront.net/9402a56f59d74815a6c962b41d93d76a.png",
    seats: 5,
    doors: "5",
    airConditioningPresent: true,
    categories: ["Econom"],
    transmission: "Automatic",
    bagagge: {
      small: 2,
      big: 1,
    },
    price: {
      total: 78.2345,
      currency: "EUR",
    },
    supplier: {
      id: "27000",
      name: "SurPrice Cars",
      rating: 0,
    },
  } as Car
  return <CarInfoCard car={car} />
})
