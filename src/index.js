import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { configureStore } from 'redux-starter-kit'

import App from './components/App'

import rootReducer from './ducks'

import './styles.scss'

const store = configureStore({
  reducer: rootReducer,
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
