/* eslint-disable no-undef */
// Create the connector object
const myConnector = tableau.makeConnector()

// Define the schema
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

// Download the data
myConnector.getData = (table, doneCallback) => {
  $.ajax({
    url: 'http://localhost:3030/graphql',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      query: `
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
    }),
    success: result => {
      console.log('result.data.region.WAHL09', result.data.region.WAHL09)
      table.appendRows(result.data.region.WAHL09)
      doneCallback()
    }
  })
}

tableau.registerConnector(myConnector)

export default tableau
