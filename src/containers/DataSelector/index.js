import React from 'react'
import { Card, FormGroup, Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { Field, reduxForm, change } from 'redux-form'

import { actions } from './ducks'
import { getRegions, getStatistics } from '../../lib/schema'

import './styles.scss'

const DataSelector = ({ importData }) => (
  <Card className="dg-dataselector">
    <h5>2. Select data</h5>
    <FormGroup label="Region" labelFor="region">
      <Field
        name="region"
        type="text"
        component={({ input }) => (
          <AsyncSelect
            isSearchable
            loadOptions={(inputValue, callback) => {
              callback(getRegions(inputValue))
            }}
            {...input}
            onBlur={event => event.preventDefault()}
            onChange={input.onChange}
          />
        )}
        id="region"
      />
    </FormGroup>
    <FormGroup label="Statistics" labelFor="statistics">
      <Field
        name="statistics"
        type="text"
        component={({ input }) => (
          <AsyncSelect
            isSearchable
            loadOptions={(inputValue, callback) => {
              callback(getStatistics(inputValue))
            }}
            {...input}
            onBlur={event => event.preventDefault()}
            onChange={input.onChange}
          />
        )}
        id="statistics"
      />
    </FormGroup>
    <Button onClick={() => importData()}>Import</Button>
  </Card>
)

DataSelector.propTypes = {
  importData: PropTypes.func.isRequired
}

DataSelector.defaultProps = {}

export default connect(
  state => ({
    ...state.dataselector,
    initialValues: {}
  }),
  {
    ...actions,
    change
    // onSubmit: (values, dispatch, props) => dispatch(actions.addTodo(values))
  }
)(reduxForm({ form: 'dataselector' })(DataSelector))
