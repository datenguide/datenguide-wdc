import React from 'react'
import { Card, FormGroup, InputGroup, Button} from '@blueprintjs/core'

const ConnectionSettings = () => (
  <Card className="dg-connectionsettings">
    <h5>2. Select data</h5>
    <FormGroup
      label="Region"
      labelFor="region"
    >
      <InputGroup id="region"  />
    </FormGroup>
    <FormGroup
      label="Statistics"
      labelFor="statistics"
    >
      <InputGroup id="statistics"  />
    </FormGroup>
    <Button>Import</Button>
  </Card>
)

export default ConnectionSettings
