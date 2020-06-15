import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'
import { CODING_LIST } from '../../../Common/constants/SectionConstants'
import {
   BUTTON_WITH_ICON_TEST_ID,
   LOADING_WRAPPER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CODING_PROBLEM_ITEM_TEST_ID } from '../../constants/IdConstants'
import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'
import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import getCodingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'

import { CodingProblemsHome } from '.'
import { goToCodingProblemCreatingFlow } from '../../utils/NavigationUtils'

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
                     activeSection={CODING_LIST}
                     navigateToCodingProblemCreatingFlow={() =>
                        goToCodingProblemCreatingFlow(history)
                     }
                     navigateToCodingProblemDetailsPage={() => {}}
                     onUserSignOut={() => {}}
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

   it('should render loader while fetching coding problems', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <CodingProblemsHome
               codingProblemsStore={codingProblemsStore}
               activeSection={CODING_LIST}
               navigateToCodingProblemCreatingFlow={() => {}}
               navigateToCodingProblemDetailsPage={() => {}}
               onUserSignOut={() => {}}
            />
         </Router>
      )

      const mockLoadingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      codingProblemsStore.getCodingProblems()

      expect(getByTestId(LOADING_WRAPPER_TEST_ID)).toBeInTheDocument()
   })

   it('should render error message on error occurred while fetching coding problems', async () => {
      const { getByText } = render(
         <Router history={createMemoryHistory()}>
            <CodingProblemsHome
               codingProblemsStore={codingProblemsStore}
               activeSection={CODING_LIST}
               navigateToCodingProblemCreatingFlow={() => {}}
               navigateToCodingProblemDetailsPage={() => {}}
               onUserSignOut={() => {}}
            />
         </Router>
      )

      const mockLoadingPromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(
         getByText(
            /We're having some trouble completing your request\. Please try again\./i
         )
      ).toBeInTheDocument()
   })

   it('should render coding problems list on success', async () => {
      const { getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <CodingProblemsHome
               codingProblemsStore={codingProblemsStore}
               activeSection={CODING_LIST}
               navigateToCodingProblemCreatingFlow={() => {}}
               navigateToCodingProblemDetailsPage={() => {}}
               onUserSignOut={() => {}}
            />
         </Router>
      )

      const mockLoadingPromise = new Promise((resolve, reject) => {
         resolve(getCodingProblemsResponse)
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(getAllByTestId(CODING_PROBLEM_ITEM_TEST_ID)[0]).toBeInTheDocument()
   })
})
