module.exports = {
  client: {
    // service: {
    //   localSchemaFile: './schemas/schema.graphql'
    // },
    service: {
      name: 'graphql-faker',
      url: 'http://localhost:4000/graphql',
      // optional disable SSL validation check
      skipSSLValidation: true
    },
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql,graphql}']
  }
}
