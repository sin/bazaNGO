import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import { Home, Main, Organization } from './components'

const createRoutes = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Main>
        <Switch>
          <Route path='/organization/:id' component={Organization} />
          <Route path='/' component={Home} />
        </Switch>
      </Main>
    </Router>
  </Provider>
)

export default createRoutes
