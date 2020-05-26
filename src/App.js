import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './components/HomePage'

import './App.css'

const App = () => {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Switch>
            <Route path='/'>
               <HomePage />
            </Route>
         </Switch>
      </Router>
   )
}

export default App
