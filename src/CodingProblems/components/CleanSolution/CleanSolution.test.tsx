import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
   ADD_BUTTON_TEST_ID,
   OVERLAY_LOADER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { CleanSolution } from './CleanSolution'

describe('CleanSolution Tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should render clean solution', () => {
      const {
         getByPlaceholderText,
         getByRole,
         getByDisplayValue,
         getByTestId
      } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      expect(getByDisplayValue(/languages/i)).toBeInTheDocument()
      expect(
         getByPlaceholderText(/file name include extension/i)
      ).toBeInTheDocument()
      expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
      expect(getByTestId(ADD_BUTTON_TEST_ID)).toBeInTheDocument()
   })

   it('should add code editor on click add button', async () => {
      const { getByTestId, getAllByPlaceholderText } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const addButton = getByTestId(ADD_BUTTON_TEST_ID)
      fireEvent.click(addButton)

      await waitFor(() => {
         expect(
            getAllByPlaceholderText(/file name include extension/i).length
         ).toBe(2)
      })
   })

   it('should remove code editor on click remove button', async () => {
      const { getByAltText, queryByPlaceholderText } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const deleteButton = getByAltText('Delete Icon')
      fireEvent.click(deleteButton)

      await waitFor(() => {
         expect(
            queryByPlaceholderText(/file name include extension/i)
         ).toBeNull()
      })
   })

   it('should invoke show toast message to complete statement first', () => {
      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should invoke show toast message on empty fields', () => {
      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[
               {
                  language: 'C++',
                  solutionContent: '#include <stdio.h>',
                  fileName: 'testing.cpp',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: '',
                  fileName: '',
                  uniqueId: 1
               }
            ]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should render loader while saving data', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postCleanSolutionAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[
               {
                  language: 'C++',
                  solutionContent: '#include <stdio.h>',
                  fileName: 'testing.cpp',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={() => {}}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
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
      codingProblemsAPI.postCleanSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[
               {
                  language: 'C++',
                  solutionContent: '#include <stdio.h>',
                  fileName: 'testing.cpp',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            onSelectTab={() => {}}
            currentTabIndex={6}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })

   it('should show success message toast and move to next tab on success', async () => {
      codingProblemsStore.codingProblemId = 10

      const showToastMessageMockFunction = jest.fn()
      const onSelectTabMockFunction = jest.fn()

      const { getByRole } = render(
         <CleanSolution
            codingProblemsStore={codingProblemsStore}
            cleanSolutions={[
               {
                  language: 'C++',
                  solutionContent: '#include <stdio.h>',
                  fileName: 'testing.cpp',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            onSelectTab={onSelectTabMockFunction}
            currentTabIndex={6}
            showToastMessage={showToastMessageMockFunction}
            updateDataStatus={() => {}}
            resetCleanSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
         expect(onSelectTabMockFunction).toBeCalled()
      })
   })
})
