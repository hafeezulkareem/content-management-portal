import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
   NUMBER_BUTTON_TEST_ID,
   CIRCLE_BUTTON_TEST_ID,
   OVERLAY_LOADER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { Hints } from './Hints'

describe('Hints Tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should render hints', () => {
      const { getByText, getByRole } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      expect(getByText(/title/i)).toBeInTheDocument()
      expect(getByText(/description/i)).toBeInTheDocument()
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
   })

   it('should add test case on add button click', async () => {
      const { getAllByTestId, getByTestId } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
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
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
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
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should show error on title empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/title is required/i)).toBeInTheDocument()
      })
   })

   it('should show error on title empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/title is required/i)).toBeInTheDocument()
      })
   })

   it('should show error on description empty field', async () => {
      codingProblemsStore.codingProblemId = 10

      const { getByRole, getByText } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[
               {
                  uniqueId: 1,
                  number: 1,
                  title: 'Testing title',
                  description: {
                     content: '',
                     contentType: 'MARKDOWN'
                  }
               }
            ]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(getByText(/description is required/i)).toBeInTheDocument()
      })
   })

   it('should render loader while saving data', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postHintAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[
               {
                  uniqueId: 1,
                  number: 1,
                  title: 'Testing title',
                  description: {
                     content: '# Testing content',
                     contentType: 'MARKDOWN'
                  }
               }
            ]}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetHints={() => {}}
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
      codingProblemsAPI.postHintAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[
               {
                  uniqueId: 1,
                  number: 1,
                  title: 'Testing title',
                  description: {
                     content: '# Testing content',
                     contentType: 'MARKDOWN'
                  }
               }
            ]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetHints={() => {}}
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
         <Hints
            codingProblemsStore={codingProblemsStore}
            hints={[
               {
                  uniqueId: 1,
                  number: 1,
                  title: 'Testing title',
                  description: {
                     content: '# Testing content',
                     contentType: 'MARKDOWN'
                  }
               }
            ]}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetHints={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })
})
