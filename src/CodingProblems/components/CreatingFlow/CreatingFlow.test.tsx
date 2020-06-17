import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'
import {
   BUTTON_WITH_ICON_TEST_ID,
   PAGE_TITLE_TEST_ID,
   LOADING_WRAPPER_TEST_ID
} from '../../../Common/constants/IdConstants'

import {
   CODING_PROBLEM_CREATE_PATH,
   CODING_PROBLEM_DETAILS_PATH
} from '../../constants/RouteConstants'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { ROUGH_SOLUTION, HINTS } from '../../constants/TabConstants'
import getCodingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'
import { goToCodingProblemsHome } from '../../utils/NavigationUtils'

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
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should navigate to coding problem home on back button click', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEM_CREATE_PATH)

      const { getByTestId } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() =>
                        goToCodingProblemsHome(history)
                     }
                     onUserSignOut={() => {}}
                  />
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

   it('should go to Statement tab by default', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEM_CREATE_PATH)

      const mockSuccessPromise = new Promise(resolve => {
         resolve(getCodingProblemDetailsResponse)
      })

      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const { getByTestId, getByRole } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      await waitFor(() => {
         expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Statement')
         expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
      })
   })

   it('should change the tab on click Rough solutions', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEM_CREATE_PATH)

      const mockSuccessPromise = new Promise(resolve => {
         resolve(getCodingProblemDetailsResponse)
      })

      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const { getByTestId, getByRole } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      const roughSolutionButton = getByTestId(ROUGH_SOLUTION)
      fireEvent.click(roughSolutionButton)

      await waitFor(() => {
         expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent(
            'Rough Solution'
         )
         expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
      })
   })

   it('should change the tab on click Hints', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEM_CREATE_PATH)

      const mockSuccessPromise = new Promise(resolve => {
         resolve(getCodingProblemDetailsResponse)
      })
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockSuccessPromise
      })
      const { getByTestId, getByRole } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      const hintsButton = getByTestId(HINTS)
      fireEvent.click(hintsButton)

      await waitFor(() => {
         expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Hints')
         expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
      })
   })

   it('should render loader while fetching coding problem details', async () => {
      const history = createMemoryHistory()
      history.push(`${CODING_PROBLEMS_PATH}1`)

      const mockFailurePromise = new Promise(() => {})
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const { getByTestId } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      await waitFor(() => {
         expect(getByTestId(LOADING_WRAPPER_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should render error view on failure', async () => {
      const history = createMemoryHistory()
      history.push(`${CODING_PROBLEMS_PATH}1`)

      const mockLoadingPromise = new Promise((_, reject) => {
         reject(new Error('Error occurred while getting problem details'))
      })
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      await waitFor(() => {
         expect(getByRole('button', { name: 'Retry' })).toBeInTheDocument()
      })
   })

   it('should render success view on success', async () => {
      const history = createMemoryHistory()
      history.push(`${CODING_PROBLEMS_PATH}1`)

      const { getByRole } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <CreatingFlow
                     codingProblemsStore={codingProblemsStore}
                     navigateToCodingProblemsHome={() => {}}
                     onUserSignOut={() => {}}
                  />
               </Route>
            </Switch>
         </Router>
      )

      await waitFor(() => {
         expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
      })
   })
})
