/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from 'redux-starter-kit'
import submit from '../../lib/tableauImporter'
import { AppToaster } from '../../components/Toaster'
import { Intent } from '@blueprintjs/core'

const slice = createSlice({
  slice: 'dataselector',
  initialState: {},
  reducers: {
    importDataSuccess: state => {},
    importDataFailure: state => {}
  }
})

export const { reducer } = slice

export const actions = {
  ...slice.actions,
  importData: payload => (dispatch, getState) => {
    const {
      form: {
        dataselector: {
          values: { region, statistics }
        },
        connectionsettings: {
          values: { datenguideApiUrl }
        }
      }
    } = getState()
    submit(datenguideApiUrl, region, statistics)
  }
}
