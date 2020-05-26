import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './common/components/HomePage'

import './App.css'
import { MarkdownPreviewer } from './common/components/MarkdownPreviewer'

const testingMarkdownText = '# This is a header\n\nAnd this is a paragraph'

const App = () => {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Switch>
            <Route path='/'>
               {/* <HomePage /> */}
               <MarkdownPreviewer markdownText={testingMarkdownText} />
            </Route>
         </Switch>
      </Router>
   )
}

export default App
