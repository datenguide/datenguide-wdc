/* eslint-disable no-undef */
import gql from 'graphql-tag'

import schema from './schema.json'
import { apolloClient } from './apiConnector'

// TODO load schema from API server
const getSchemaArgs = statistics => {
  return schema[statistics].args
}

const getQuery = (region, statistics) => {
  const argsToFilter = a => a.map(arg => `${arg}: {nin: []}`).join(',')
  const argsToFields = a => a.join('\n')
  const args = getSchemaArgs(statistics)
  const argumentNames = Object.keys(args)

  return `
        {
          region(id: "${region}") {
            id
            name
              ${statistics}(filter: {${argsToFilter(argumentNames)}}) {
              value
              year
              ${argsToFields(argumentNames)}
            }
          }
        }
      `
}

const connector = tableau.makeConnector()

connector.getSchema = schemaCallback => {
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
    }
  ]

  const { statistics } = JSON.parse(tableau.connectionData)
  const args = getSchemaArgs(statistics)
  const argumentNames = Object.keys(args)

  argumentNames.forEach(arg => {
    cols.push({
      id: arg,
      alias: args[arg].name,
      dataType: tableau.dataTypeEnum.string
    })
  })

  const tableSchema = {
    id: 'Datenguide',
    alias: 'Datenguide Web Data Connector Data',
    columns: cols
  }

  schemaCallback([tableSchema])
}

connector.getData = async (table, doneCallback) => {
  const { apiUrl, region, statistics } = JSON.parse(tableau.connectionData)

  const result = await apolloClient(apiUrl).query({
    query: gql`
      ${getQuery(region, statistics)}
    `
  })
  table.appendRows(result.data.region[statistics])
  doneCallback()
}
tableau.registerConnector(connector)

const submit = (apiUrl, region, statistics) => {
  tableau.connectionData = JSON.stringify({ apiUrl, region, statistics })
  tableau.connectionName = 'Datenguide Web Data Connector'
  tableau.submit()
}

export default submit
