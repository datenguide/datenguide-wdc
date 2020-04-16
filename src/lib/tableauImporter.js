/* eslint-disable no-undef */
import gql from 'graphql-tag'

import schema from './schema.json'
import { client } from './apiConnector'

// TODO load schema from API server
const getSchemaArgs = (statistics) => {
  return schema[statistics].args
}

const getQuery = (region, statistics) => {
  const argToFilter = (a) => `${a}: {nin: []}`
  const argsToFilter = (a) =>
    a.length > 0
      ? `(filter: {${a.map((arg) => argToFilter(arg)).join(',')}})`
      : ''
  const argsToFields = (a) => a.join('\n')
  const args = getSchemaArgs(statistics)
  const argumentNames = Object.keys(args)

  return `
        {
          region(id: "${region}") {
            id
            name
              ${statistics}${argsToFilter(argumentNames)} {
              value
              year
              ${argsToFields(argumentNames)}
            }
          }
        }
      `
}

const connector = tableau.makeConnector()

const getTableSchema = (statistic) => {
  const cols = [
    {
      id: 'id',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'year',
      alias: 'Year',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'value',
      alias: 'Value',
      dataType: tableau.dataTypeEnum.float,
    },
  ]
  const args = getSchemaArgs(statistic.value)
  const argumentNames = Object.keys(args)

  argumentNames.forEach((arg) => {
    cols.push({
      id: arg,
      alias: args[arg].name,
      dataType: tableau.dataTypeEnum.string,
    })
  })

  return {
    id: statistic.value,
    alias: statistic.label,
    columns: cols,
  }
}

connector.getSchema = (schemaCallback) => {
  const { statistics } = JSON.parse(tableau.connectionData)
  schemaCallback(statistics.map((s) => getTableSchema(s)))
}

connector.getData = async (table, doneCallback) => {
  const { apiUrl, region } = JSON.parse(tableau.connectionData)

  const result = await client.query({
    query: gql`
      ${getQuery(region, table.tableInfo.id)}
    `,
    context: { uri: apiUrl },
  })
  table.appendRows(result.data.region[table.tableInfo.id])
  doneCallback()
}
tableau.registerConnector(connector)

const submit = (apiUrl, region, statistics) => {
  tableau.connectionData = JSON.stringify({ apiUrl, region, statistics })
  tableau.connectionName = 'Datenguide Web Data Connector'
  tableau.submit()
}

export default submit
