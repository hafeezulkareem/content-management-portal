import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { routes as authenticationRoutes } from './Authentication/routes'
import { routes as codingProblemsRoutes } from './CodingProblems/routes'
import stores from './common/stores'
import './App.css'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {codingProblemsRoutes}
               <Route path='/'>{authenticationRoutes}</Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
