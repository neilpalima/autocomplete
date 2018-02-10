import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import Search from './search'

const App = () => (
  <div>
    <style>{`
      body {
        background-color: #DADADA;
      }
      body > div,
      body > div > div {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '60%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {' '}Search
        </Header>
          <Search />
      </Grid.Column>
    </Grid>
  </div>
)

export default App;