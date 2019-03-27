import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import fetch from 'unfetch'
import gql from 'graphql-tag'

const apiConnector = {
  client: null
}

export const initialize = uri => {
  // custom initialization to make Tableau happy
  apiConnector.client = new ApolloClient({
    link: createHttpLink({
      uri: `${uri}/graphql`,
      fetch
    }),
    cache: new InMemoryCache()
  })
  return apiConnector.client.query({
    query: gql`
      {
        region(id: "11") {
          id
          name
        }
      }
    `
  })
}

export const apolloClient = uri => {
  if (uri) {
    initialize(uri)
  }
  if (apiConnector.client) {
    return apiConnector.client
  }
  throw new Error('Apollo Client has not been initialized')
}
