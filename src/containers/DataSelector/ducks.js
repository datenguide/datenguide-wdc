/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from '@reduxjs/toolkit'
import submit from '../../lib/tableauImporter'

const slice = createSlice({
  name: 'dataselector',
  initialState: {},
  reducers: {},
})

export const { reducer } = slice

export const actions = {
  ...slice.actions,
  importData: () => (dispatch, getState) => {
    const {
      form: {
        dataselector: {
          values: { region, statistics },
        },
        connectionsettings: {
          values: { datenguideApiUrl },
        },
      },
    } = getState()
    submit(datenguideApiUrl, region.value, statistics)
  },
}
