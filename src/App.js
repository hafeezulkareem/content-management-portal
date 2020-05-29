import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { routes as authenticationRoutes } from './Authentication/routes'
import { routes as codingProblemsRoutes } from './CodingProblems/routes'
import stores from './common/stores'
import './App.css'
import { CODING_PROBLEM_CREATE_PATH } from './CodingProblems/constants/RouteConstants'
import { CreatingFlow } from './CodingProblems/components/CreatingFlow'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {/* <Route path={CODING_PROBLEM_CREATE_PATH}>
                  <CreatingFlow
                     codingProblemsStore={stores.codingProblemsStore}
                  />
               </Route> */}
               {codingProblemsRoutes}
               <Route path='/'>{authenticationRoutes}</Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
