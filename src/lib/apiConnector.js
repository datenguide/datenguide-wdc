import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import fetch from 'unfetch'
import gql from 'graphql-tag'

const context = {
  uri: null
}

export const client = new ApolloClient({
  link: createHttpLink({
    // uri: `${uri}/graphql`,
    fetch
  }),
  cache: new InMemoryCache()
})


export const initialize = async uri => {
  context.uri = uri
  return client.query({
    query: gql`
      {
        region(id: "11") {
          id
          name
        }
      }
    `,
    context
  } )
}

