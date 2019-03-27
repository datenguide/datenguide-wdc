import React from 'react'
import { Card, FormGroup, InputGroup, Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { actions } from './ducks'

import './styles.scss'

const DataSelector = ({ importData }) => (
  <Card className="dg-dataselector">
    <h5>2. Select data</h5>
    <FormGroup label="Region" labelFor="region">
      <Field
        name="region"
        type="text"
        component={({ input }) => <InputGroup {...input} />}
        id="region"
      />
    </FormGroup>
    <FormGroup label="Statistics" labelFor="statistics">
      <Field
        name="statistics"
        type="text"
        component={({ input }) => <InputGroup {...input} />}
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
    ...actions
    // onSubmit: (values, dispatch, props) => dispatch(actions.addTodo(values))
  }
)(reduxForm({ form: 'dataselector' })(DataSelector))
