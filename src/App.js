import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { CodingProblemsRoute } from './CodingProblems/routes/CodingProblemsRoute'
import { SignIn } from './Authentication/components/SignIn'
import HomePage from './common/components/HomePage'
import stores from './common/stores'
import './App.css'

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/sign-in'>
                  <SignIn />
               </Route>
               <Route path='/'>
                  {/* <HomePage /> */}
                  <CodingProblemsRoute />
               </Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
