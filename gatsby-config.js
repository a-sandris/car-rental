const proxy = require("http-proxy-middleware")

module.exports = {
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/graphql",
      proxy({
        target: "https://car-rental-lambda.netlify.com",
        changeOrigin: true
      })
    )
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-antd`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'CAR_RENTAL_API',
        fieldName: 'carRental',
        url: 'https://car-rental-lambda.netlify.com/.netlify/functions/graphql',
      },
    }],
}
