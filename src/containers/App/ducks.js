/*  __
___( o)>
\ <_. )
 `---'
*/

export const IMPORT_DATA = 'datenguide-wdc/App/IMPORT_DATA'

export const app = (state = {}, action = {}) => {
  switch (action.type) {
    default:
      return state
  }
}

export const actions = {
  importData: data => ({
    type: IMPORT_DATA,
    payload: {
      data
    }
  })
}
