export interface Car {
  id: string
  name: string
  imageUrl?: string
  seats: number
  doors?: string
  airConditioningPresent: boolean
  categories: string[]
  transmission: "Automatic" | "Manual"
  bagagge: {
    small: number
    big: number
  }
  price: {
    total: number
    currency: string
  }
  supplier: Supplier
}

export interface Supplier {
  id: string
  name: string
  rating: number
}
