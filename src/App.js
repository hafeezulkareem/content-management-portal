import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './common/components/HomePage'

import './App.css'

import { CodingProblemsRoute } from './CodingProblems/routes/CodingProblemsRoute'
import { SignIn } from './Authentication/components/SignIn'

const App = () => {
   return (
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
   )
}

export default App
