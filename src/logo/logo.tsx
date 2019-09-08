import guerin from "./guerin.png"

const companies = [
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/cdbc87fcbb4b484fbce9f9ff89744ba5_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/a67f055c09bb4ed5821188a71d6c3299_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/auto5.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/auto26.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/avis.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/budget.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/carsrent.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/a7e4892b101144b380f98c1e37eec65f_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/21f8bd2ca4f14174b21c7a414cbc1014_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/d0d6c18280bf4ce5a1e5f3c105753682_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/0df0117ecff147b7b170574099897952_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/interrent.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/89e38211c6bb4381bd18c3150508a32c_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d2f9dw3b0opbul.cloudfront.net/f2582f6516e84119b9a91dfefd7e522d_orig.png",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/nu_estonia.jpg",
  },
  {
    name: "abc",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/rentis.jpg",
  },
  {
    name: "sixt",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/sixt.jpg",
  },
  {
    name: "SurPrice Cars",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/surprice.jpg",
  },
  {
    name: "hertz",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/hertz.jpg",
  },
  {
    name: "europcar",
    logo:
      "https://d1tm31ub00yrbq.cloudfront.net/otaimages/vendor/large/europcar.jpg",
  },
  { name: "guerin", logo: guerin },
  { name: "guerin premium", logo: guerin },
]

export const logo = (name: string): string => {
  const item = companies.find(
    it => it.name.toLowerCase() === name.trim().toLowerCase()
  )
  return item ? item.logo : ""
}
