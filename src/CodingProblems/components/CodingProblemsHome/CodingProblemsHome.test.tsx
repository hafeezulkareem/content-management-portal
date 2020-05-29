import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CODING_PROBLEMS_PATH } from '../../../common/constants/RouteConstants'
import { BUTTON_WITH_ICON_TEST_ID } from '../../../common/constants/IdConstants'

import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'
import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { CodingProblemsHome } from '.'

const TestingComponent = () => {
   return (
      <div>
         <p data-testid='testing-message'>
            This is a testing component for navigation from coding problems home
            to creating flow
         </p>
      </div>
   )
}

describe('CodingProblemsHome tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsAPI()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should navigate to coding problem creating flow on click add question button', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEMS_PATH)

      const { getByTestId } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_CREATE_PATH}>
                  <TestingComponent />
               </Route>
               <Route exact path={CODING_PROBLEMS_PATH}>
                  <CodingProblemsHome
                     codingProblemsStore={codingProblemsStore}
                  />
               </Route>
            </Switch>
         </Router>
      )

      const addQuestionsButton = getByTestId(BUTTON_WITH_ICON_TEST_ID)

      fireEvent.click(addQuestionsButton)

      await waitFor(() => {
         expect(addQuestionsButton).not.toBeInTheDocument()
         expect(getByTestId('testing-message')).toBeInTheDocument()
      })
   })
})
