import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Card, FormGroup, InputGroup } from '@blueprintjs/core'
import { connect } from 'react-redux'
// import { actions } from './ducks'

import './styles.scss'

const ConnectionSettings = ({ handleSubmit }) => (
  <Card className="dg-connectionsettings">
    <h5>1. Connect to datenguide</h5>
    <FormGroup
      label="datenguide API URL"
      labelFor="datenguideApiUrl"
    >
      <InputGroup id="datenguideApiUrl"  />
    </FormGroup>
    <Button>Test Connection</Button>
  </Card>
)

ConnectionSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

ConnectionSettings.defaultProps = {}

export default connect(
  state => ({
    initialValues: { title: '' }
  }),
  dispatch => {
    return {
      // onSubmit: (values, dispatch, props) => dispatch(actions.addTodo(values))
    }
  }
)(reduxForm({ form: 'connectionsettings' })(ConnectionSettings))


