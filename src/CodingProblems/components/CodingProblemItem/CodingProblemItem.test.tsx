import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'

import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { CODING_PROBLEM_DETAILS_PATH } from '../../constants/RouteConstants'
import { CODING_PROBLEM_ITEM_TEST_ID } from '../../constants/IdConstants'
import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import {
   goToCodingProblemCreatingFlow,
   goToCodingProblemsDetailsPage
} from '../../utils/NavigationUtils'

import { CodingProblemsHome } from '../CodingProblemsHome'
import { CODING_LIST } from '../../../Common/constants/SectionConstants'

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

describe('CodingProblemItem tests', () => {
   let codingProblemsFixture, codingProblemsStore

   beforeEach(() => {
      codingProblemsFixture = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsFixture)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should navigate to coding problem details page on coding problem item click', async () => {
      const history = createMemoryHistory()
      history.push(CODING_PROBLEMS_PATH)

      const { getAllByTestId, getByTestId } = render(
         <Router history={history}>
            <Switch>
               <Route exact path={CODING_PROBLEMS_PATH}>
                  <CodingProblemsHome
                     codingProblemsStore={codingProblemsStore}
                     activeSection={CODING_LIST}
                     navigateToCodingProblemCreatingFlow={() =>
                        goToCodingProblemCreatingFlow(history)
                     }
                     navigateToCodingProblemDetailsPage={() =>
                        goToCodingProblemsDetailsPage(history, 0)
                     }
                     onUserSignOut={() => {}}
                  />
               </Route>
               <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
                  <TestingComponent />
               </Route>
            </Switch>
         </Router>
      )

      let codingProblemItems

      await waitFor(() => {
         codingProblemItems = getAllByTestId(CODING_PROBLEM_ITEM_TEST_ID)
      })
      fireEvent.click(codingProblemItems[0])

      await waitFor(() => {
         codingProblemItems.forEach(codingProblemItem => {
            expect(codingProblemItem).not.toBeInTheDocument()
         })
         expect(getByTestId('testing-message')).toBeInTheDocument()
      })
   })
})
