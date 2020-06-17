import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
   CIRCLE_BUTTON_TEST_ID,
   NUMBER_BUTTON_TEST_ID,
   OVERLAY_LOADER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { TestCases } from './TestCases'

describe('TestCases Tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should render test cases', () => {
      const { getByText, getByRole } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      expect(getByText(/input/i)).toBeInTheDocument()
      expect(getByText(/output/i)).toBeInTheDocument()
      expect(getByText(/score/i)).toBeInTheDocument()
      expect(getByText(/is hidden/i)).toBeInTheDocument()
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
   })

   it('should add test case on add button click', async () => {
      const { getAllByTestId, getByTestId } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const addButton = getByTestId(CIRCLE_BUTTON_TEST_ID)
      fireEvent.click(addButton)

      await waitFor(() => {
         expect(getAllByTestId(NUMBER_BUTTON_TEST_ID).length).toBe(2)
      })
   })

   it('should remove test case on remove button click', async () => {
      const { queryAllByTestId, getByAltText } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const removeButton = getByAltText('Remove Icon')
      fireEvent.click(removeButton)

      await waitFor(() => {
         expect(queryAllByTestId(NUMBER_BUTTON_TEST_ID).length).toBe(0)
      })
   })

   it('should invoke show toast message to complete statement first', () => {
      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should show error on input empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/input is required/i)).toBeInTheDocument()
      })
   })

   it('should show error on output empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[
               {
                  uniqueId: 1,
                  number: 1,
                  input: '100',
                  output: '',
                  score: '',
                  isHidden: false
               }
            ]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/output is required/i)).toBeInTheDocument()
      })
   })

   it('should show error on score empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[
               {
                  uniqueId: 1,
                  number: 1,
                  input: '100',
                  output: '50',
                  score: '',
                  isHidden: false
               }
            ]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/score is required/i)).toBeInTheDocument()
      })
   })

   it('should render loader while saving data', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[
               {
                  uniqueId: 1,
                  number: 1,
                  input: '100',
                  output: '50',
                  score: '45',
                  isHidden: false
               }
            ]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByTestId(OVERLAY_LOADER_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should show error message toast on failure', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Error while saving the data'))
      }).catch(error => error)
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[
               {
                  uniqueId: 1,
                  number: 1,
                  input: '100',
                  output: '50',
                  score: '45',
                  isHidden: false
               }
            ]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })

   it('should show success message toast on success', async () => {
      codingProblemsStore.codingProblemId = 10

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <TestCases
            codingProblemsStore={codingProblemsStore}
            testCases={[
               {
                  uniqueId: 1,
                  number: 1,
                  input: '100',
                  output: '50',
                  score: '45',
                  isHidden: false
               }
            ]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetTestCases={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })
})
