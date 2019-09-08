export const formatCurrency = (currency: string): string => {
  switch (currency) {
    case "EUR":
      return "€"
    case "GBP":
      return "£"
    case "USD":
      return "$"
    default:
      return currency
  }
}
