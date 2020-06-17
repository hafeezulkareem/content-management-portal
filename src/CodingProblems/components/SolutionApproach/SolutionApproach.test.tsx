import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'

import {
   DROP_DOWN_SELECT_TEST_ID,
   OVERLAY_LOADER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { SolutionApproach } from './SolutionApproach'

describe('SolutionApproach Tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should render solution approach', () => {
      const { getByText } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={null}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      expect(getByText(/title/i)).toBeInTheDocument()
      expect(getByText(/description/i)).toBeInTheDocument()
      expect(getByText(/complexity analysis/i)).toBeInTheDocument()
   })

   it('should render given description and complexity analysis', async () => {
      const { getByDisplayValue, getByTitle, getAllByTestId } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'HTML',
                  content: '<h1>Python</h1>'
               },
               complexityAnalysis: {
                  type: 'MARKDOWN',
                  content: '# Javascript'
               }
            }}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      const dropDowns = getAllByTestId(DROP_DOWN_SELECT_TEST_ID)

      expect(dropDowns[0].value).toBe('HTML')
      expect(dropDowns[1].value).toBe('MARKDOWN')
      expect(
         getByDisplayValue(/testing solution approach/i)
      ).toBeInTheDocument()
      expect(getByTitle('htmlPreviewer').srcdoc).toBe('<h1>Python</h1>')
   })

   it('should invoke show toast message to complete statement first', async () => {
      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={null}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should render error message on empty title field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={null}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/title is required/i)).toBeInTheDocument()
      })
   })

   it('should render error message on empty description', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'TEXT',
                  content: ''
               },
               complexityAnalysis: {
                  type: 'TEXT',
                  content: ''
               }
            }}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/description is required/i)).toBeInTheDocument()
      })
   })

   it('should render error message on empty complexity analysis', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'HTML',
                  content: '<h1>Python</h1>'
               },
               complexityAnalysis: {
                  type: 'TEXT',
                  content: ''
               }
            }}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(
            getByText(/complexity analysis is required/i)
         ).toBeInTheDocument()
      })
   })

   it('should render loader while saving the data', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postSolutionApproachAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'HTML',
                  content: '<h1>Python</h1>'
               },
               complexityAnalysis: {
                  type: 'TEXT',
                  content: 'Sample testing'
               }
            }}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(getByTestId(OVERLAY_LOADER_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should should error message toast on failure', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Error while saving data'))
      })
      codingProblemsAPI.postSolutionApproachAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'HTML',
                  content: '<h1>Python</h1>'
               },
               complexityAnalysis: {
                  type: 'TEXT',
                  content: 'Sample testing'
               }
            }}
            onSelectTab={() => {}}
            currentTabIndex={5}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })

   it('should should success message toast and move to next tab on success', async () => {
      codingProblemsStore.codingProblemId = 10

      const showToastMessageMockFunction = jest.fn()
      const onSelectTabMockFunction = jest.fn()

      const { getByRole } = render(
         <SolutionApproach
            codingProblemsStore={codingProblemsStore}
            solutionApproach={{
               title: 'Testing solution approach',
               description: {
                  type: 'HTML',
                  content: '<h1>Python</h1>'
               },
               complexityAnalysis: {
                  type: 'TEXT',
                  content: 'Sample testing'
               }
            }}
            onSelectTab={onSelectTabMockFunction}
            currentTabIndex={5}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
         expect(onSelectTabMockFunction).toBeCalled()
      })
   })
})
