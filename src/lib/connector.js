/* eslint-disable no-undef */
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'unfetch'

const myConnector = tableau.makeConnector()

myConnector.getSchema = schemaCallback => {
  const cols = [
    {
      id: 'id',
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: 'year',
      alias: 'Year',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'value',
      alias: 'Value',
      dataType: tableau.dataTypeEnum.float
    },
    {
      id: 'PART04',
      alias: 'Political Party',
      dataType: tableau.dataTypeEnum.string
    }
  ]

  const tableSchema = {
    id: 'Datenguide',
    alias: 'Datenguide Web Data Connector Data',
    columns: cols
  }

  schemaCallback([tableSchema])
}

myConnector.getData = async (table, doneCallback) => {
  // custom initialization to make Tableau happy
  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:3030/graphql',
      fetch
    }),
    cache: new InMemoryCache()
  })
  const result = await client.query({
    query: gql`
      {
        region(id: "11") {
          id
          name
          WAHL09(filter: { PART04: { nin: [] } }) {
            value
            year
            PART04
          }
        }
      }
    `
  })
  table.appendRows(result.data.region.WAHL09)
  doneCallback()
}

tableau.registerConnector(myConnector)

export default tableau
