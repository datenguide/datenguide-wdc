import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import tableau from '../../lib/connector'
import Navbar from '../../components/Navbar'

import ConnectionSettings from '../ConnectionSettings'
import Query from '../Query'

import './styles.scss'

const submitTableau = () => {
  tableau.connectionName = 'Datenguide Web Data Connector'
  tableau.submit()
}

const Index = () => (
  <div className="dg-app">
    <Navbar />
    <div className="dg-app__wrapper">
      <ConnectionSettings />
      <Query />
    </div>
  </div>
)

export default Index
