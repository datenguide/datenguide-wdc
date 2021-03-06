import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Card, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { actions } from './ducks'

import './styles.scss'

const ConnectionSettings = ({ handleSubmit, testConnection, connected }) => (
  <Card className="dg-connectionsettings">
    <h5>1. Connect to datenguide</h5>
    <form>
      <FormGroup label="datenguide API Endpoint" labelFor="datenguideApiUrl">
        <Field
          name="datenguideApiUrl"
          type="text"
          component={({ input }) => (
            <InputGroup
              {...input}
              leftIcon={connected ? 'tick-circle' : 'circle'}
              intent={connected ? Intent.SUCCESS : Intent.NONE}
            />
          )}
          id="datenguideApiUrl"
        />
      </FormGroup>
      <Button onClick={() => testConnection()}>Test Connection</Button>
    </form>
  </Card>
)

ConnectionSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  testConnection: PropTypes.func.isRequired,
}

ConnectionSettings.defaultProps = {}

export default connect(
  (state) => {
    return {
      initialValues: {
        datenguideApiUrl: 'https://api-next.datengui.de/graphql',
      },
      ...state.connection,
    }
  },
  {
    ...actions,
    // onSubmit: (values, dispatch, props) => dispatch(actions.addTodo(values))
  }
)(reduxForm({ form: 'connectionsettings' })(ConnectionSettings))
