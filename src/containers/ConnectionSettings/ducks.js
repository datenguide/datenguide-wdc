/* eslint-disable no-param-reassign */
/*  __
___( o)>
\ <_. )
 `---'
*/

import { createSlice } from 'redux-starter-kit'
import { Intent } from '@blueprintjs/core'

import { initialize } from '../../lib/apiConnector'
import { AppToaster } from '../../components/Toaster'

const slice = createSlice({
  slice: 'connection',
  initialState: { connected: false },
  reducers: {
    initializeClientSuccess: (state) => {
      state.connected = true
    },
    initializeClientFailure: (state) => {
      state.connected = false
    },
  },
})

export const { reducer } = slice

const showSuccessToast = () =>
  AppToaster.show({
    message: 'datenguide API Connection successful',
    intent: Intent.SUCCESS,
    icon: 'tick-circle',
  })

const showFailureToast = (error) =>
  AppToaster.show({
    message: `Could not connect to datenguide API: ${error}`,
    intent: Intent.DANGER,
    icon: 'error',
  })

export const actions = {
  ...slice.actions,
  testConnection: (payload) => (dispatch, getState) => {
    const {
      form: {
        connectionsettings: {
          values: { datenguideApiUrl },
        },
      },
    } = getState()
    initialize(datenguideApiUrl)
      .then((response) => {
        if (response.data != null) {
          dispatch(actions.initializeClientSuccess())
          showSuccessToast()
        } else {
          dispatch(actions.initializeClientFailure())
          showFailureToast('no data received')
        }
      })
      .catch((e) => {
        dispatch(actions.initializeClientFailure())
        showFailureToast(e)
      })
  },
}
