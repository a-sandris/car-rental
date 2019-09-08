const { ApolloServer, gql } = require('apollo-server-lambda')
const { CarsAPI } = require('./datasource')

const typeDefs = gql`
  enum Transmission {
    Automatic
    Manual
  }
  enum Sort {
    Asc
    Desc
  }
  type Bagagge {
    small: Int!
    big: Int!
  }
  type Price {
    total: Float!
    currency: String!
  }
  type Car {
    id: ID!
    name: String!
    imageUrl: String
    seats: Int!
    doors: String
    airConditioningPresent: Boolean!
    categories: [String!]!
    transmission: Transmission!
    bagagge: Bagagge!
    price: Price!
    supplier: Supplier!
  }
  type Supplier {
    id: ID!
    name: String!
    rating: Float!
  }
  input PageRequest {
    offset: Int!
    limit: Int!
  }
  type CarPage {
    page: Int!
    totalPages: Int!
    totalItems: Int!
    items: [Car!]!
  }
  type Query {
    fetchCars(req: PageRequest!, companies: [String!], sort: Sort): CarPage!
    suppliers: [Supplier!]!
  }
`;

const resolvers = {
  Query: {
    fetchCars: async (root, { req, companies, sort = 'Asc' }, { dataSources }) => {
      const cars = (await dataSources.carsAPI.getCars())
        .sort((a, b) => sort === 'Asc' ? a.price.total - b.price.total : b.price.total - a.price.total)
        .filter(it => !companies || companies.length === 0 || companies.map(it => it.trim().toLowerCase()).indexOf(it.supplier.name.toLowerCase().trim()) > -1)
      return {
        page: Math.ceil(req.offset / req.limit),
        totalPages: Math.ceil(cars.length / req.limit),
        totalItems: cars.length,
        items: cars.slice(req.offset, req.offset + req.limit)
      }
    },
    suppliers: (root, args, { dataSources }) => dataSources.carsAPI.getSuppliers()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    carsAPI: new CarsAPI()
  })
})

exports.handler = server.createHandler()