/*  __
___( o)>
\ <_. )
 `---'
*/

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { app } from './containers/App/ducks'

export default combineReducers({ app, form: formReducer })
