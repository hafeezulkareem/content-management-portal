import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CODING_PROBLEMS_PATH } from '../../../common/constants/RouteConstants'
import {
   BUTTON_WITH_ICON_TEST_ID,
   PAGE_TITLE_TEST_ID,
   CONTENT_EDITOR_TEST_ID
} from '../../../common/constants/IdConstants'

import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import { ROUGH_SOLUTION, HINTS } from '../../constants/TabConstants'

import { CreatingFlow } from '.'

const TestingComponent = () => {
   return (
      <div>
         <p data-testid='testing-message'>
            This is a testing component for navigation from creating flow to
            coding problems home
         </p>
      </div>
   )
}

describe('CreatingFlow tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsAPI()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should navigate to coding problem home on back button click', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEM_CREATE_PATH)

      const { getByTestId } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_CREATE_PATH}>
                  <CreatingFlow codingProblemsStore={codingProblemsStore} />
               </Route>
               <Route exact path={CODING_PROBLEMS_PATH}>
                  <TestingComponent />
               </Route>
            </Switch>
         </Router>
      )

      const backToHomeButton = getByTestId(BUTTON_WITH_ICON_TEST_ID)

      fireEvent.click(backToHomeButton)

      await waitFor(() => {
         expect(backToHomeButton).not.toBeInTheDocument()
         expect(getByTestId('testing-message')).toBeInTheDocument()
      })
   })

   it('should go to Statement tab by default', () => {
      const { getByTestId, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <CreatingFlow codingProblemsStore={codingProblemsStore} />
         </Router>
      )

      expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Statement')
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
   })

   it('should change the tab on click Rough solutions', () => {
      const { getByTestId, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <CreatingFlow codingProblemsStore={codingProblemsStore} />
         </Router>
      )

      const roughSolutionButton = getByTestId(ROUGH_SOLUTION)
      fireEvent.click(roughSolutionButton)

      expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent(
         'Rough Solution'
      )
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
   })

   it('should change the tab on click Hints', () => {
      const { getByTestId, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <CreatingFlow codingProblemsStore={codingProblemsStore} />
         </Router>
      )

      const hintsButton = getByTestId(HINTS)
      fireEvent.click(hintsButton)

      expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Hints')
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
   })
})
