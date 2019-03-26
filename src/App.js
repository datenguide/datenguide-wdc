import React from 'react'
import './App.css'
import { Button } from 'reactstrap'
import tableau from './lib/connector'

const submitTableau = () => {
  tableau.connectionName = 'Datenguide Web Data Connector'
  tableau.submit()
}

const App = () => (
  <div className="App">
    <div className="container container-table">
      <div className="row vertical-center-row">
        <div className="text-center col-md-4 col-md-offset-4">
          <Button
            color="success"
            style={{ margin: '10px' }}
            onClick={submitTableau}
          >
            Get Datenguide Data!
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default App
