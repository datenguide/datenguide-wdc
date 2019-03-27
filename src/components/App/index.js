import React from 'react'
import Navbar from '../Navbar'

import ConnectionSettings from '../../containers/ConnectionSettings'
import DataSelector from '../../containers/DataSelector'

import './styles.scss'

const App = () => (
  <div className="dg-app">
    <Navbar />
    <div className="dg-app__wrapper">
      <ConnectionSettings />
      <DataSelector />
    </div>
  </div>
)

export default App
