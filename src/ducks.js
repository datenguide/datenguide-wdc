/*  __
___( o)>
\ <_. )
 `---'
*/

import { reducer as form } from 'redux-form'
import { reducer as connection } from './containers/ConnectionSettings/ducks'
import { reducer as dataselector } from './containers/DataSelector/ducks'

export default {
  form,
  connection,
  dataselector,
}
