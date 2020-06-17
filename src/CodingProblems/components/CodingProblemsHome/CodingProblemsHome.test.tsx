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
import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { goToCodingProblemCreatingFlow } from '../../utils/NavigationUtils'

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
      codingProblemsAPI = new CodingProblemsFixture()
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

      const mockLoadingPromise = new Promise(() => {})
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

      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockFailurePromise
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

      await codingProblemsStore.getCodingProblems()

      expect(getAllByTestId(CODING_PROBLEM_ITEM_TEST_ID)[0]).toBeInTheDocument()
   })

   it('should render no data view on success with no data', async () => {
      const { getByText, getByAltText } = render(
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

      const mockSuccessPromise = new Promise(resolve => {
         resolve({
            total_questions: 0,
            offset: 0,
            limit: 10,
            questions_list: []
         })
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(getByAltText(/empty image/i)).toBeInTheDocument()
      expect(getByText(/no data found!/i)).toBeInTheDocument()
   })
})
