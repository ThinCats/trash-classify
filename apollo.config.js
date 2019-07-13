module.exports = {
  client: {
    // service: {
    //   localSchemaFile: './schemas/schema.graphql'
    // },
    service: {
      name: 'graphql-faker',
      url: 'http://localhost:9002/graphql',
      // optional disable SSL validation check
      skipSSLValidation: true
    },
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql,graphql}']
  }
}
