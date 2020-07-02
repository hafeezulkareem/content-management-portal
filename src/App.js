import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { routes as authenticationRoutes } from './Authentication/routes'
import { routes as codingProblemsRoutes } from './CodingProblems/routes'
import { NotFound } from './Common/components/NotFound'
import { OverlayLoader } from './Common/components/OverlayLoader'
import stores from './Common/stores'
import './App.css'

const App = () => {
   return (
      <Provider {...stores}>
         <Suspense fallback={<OverlayLoader />}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  {codingProblemsRoutes}
                  <Route exact path='/'>
                     {authenticationRoutes}
                  </Route>
                  <Route component={NotFound} />
               </Switch>
            </Router>
         </Suspense>
      </Provider>
   )
}

export default App
