import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
   ADD_BUTTON_TEST_ID,
   DELETE_ICON_TEST_ID,
   OVERLAY_LOADER_TEST_ID
} from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { ROUGH_SOLUTION } from '../../constants/TabConstants'

import { RoughSolution } from './RoughSolution'

describe('RoughSolution tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should add code editor on click add button', async () => {
      const { getByTestId, getAllByPlaceholderText } = render(
         <RoughSolution
            roughSolutions={[]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={() => {}}
            resetRoughSolutions={() => {}}
         />
      )

      const roughSolutionAddButton = getByTestId(ADD_BUTTON_TEST_ID)
      fireEvent.click(roughSolutionAddButton)

      await waitFor(() => {
         expect(
            getAllByPlaceholderText(/file name include extension/i).length
         ).toBe(2)
      })
   })

   it('should remove code editor on click remove button', async () => {
      const { getByTestId, queryByPlaceholderText } = render(
         <RoughSolution
            roughSolutions={[]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={() => {}}
            resetRoughSolutions={() => {}}
         />
      )

      const roughSolutionDeleteButton = getByTestId(DELETE_ICON_TEST_ID)
      fireEvent.click(roughSolutionDeleteButton)

      await waitFor(() => {
         expect(
            queryByPlaceholderText(/file name include extension/i)
         ).toBeNull()
      })
   })

   // it('should not remove code editor on Delete API fail', async () => {
   //    const mockFailurePromise = new Promise((resolve, reject) => {
   //       reject(new Error('Error while deleting'))
   //    })
   //    codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
   //       return mockFailurePromise
   //    })

   //    const { getByTestId, getAllByPlaceholderText } = render(
   //       <RoughSolution
   //          roughSolutions={[]}
   //          codingProblemId={[]}
   //          codingProblemsStore={codingProblemsStore}
   //          onSelectTab={() => {}}
   //          currentTabIndex={2}
   //          updateDataStatus={() => {}}
   //       />
   //    )

   //    const roughSolutionDeleteButton = getByTestId(DELETE_ICON_TEST_ID)
   //    fireEvent.click(roughSolutionDeleteButton)

   //    await waitFor(() => {
   //       expect(
   //          getAllByPlaceholderText(/file name include extension/i).length
   //       ).toBe(1)
   //    })
   // })

   it('should remove code editor on Delete API success', async () => {
      const { getByTestId, queryAllByPlaceholderText } = render(
         <RoughSolution
            roughSolutions={[]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={() => {}}
            resetRoughSolutions={() => {}}
         />
      )

      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve('Code editor deleted successfully')
      })
      codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const roughSolutionDeleteButton = getByTestId(DELETE_ICON_TEST_ID)
      fireEvent.click(roughSolutionDeleteButton)

      await waitFor(() => {
         expect(
            queryAllByPlaceholderText(/file name include extension/i).length
         ).toBe(0)
      })
   })

   it('should render file name on change file name', async () => {
      const { getByPlaceholderText } = render(
         <RoughSolution
            roughSolutions={[]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={() => {}}
            resetRoughSolutions={() => {}}
         />
      )

      const fileNameInputField = getByPlaceholderText(
         /file name include extension/i
      )
      fireEvent.change(fileNameInputField, {
         target: { value: 'This is testing filename' }
      })

      expect(fileNameInputField.value).toBe('This is testing filename')
   })

   it('should invoke show toast message to complete statement first', async () => {
      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <RoughSolution
            roughSolutions={[]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={showToastMessageMockFunction}
            resetRoughSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(showToastMessageMockFunction).toBeCalled()
   })

   it('should render error message on empty fields', async () => {
      codingProblemsStore.codingProblemId = 10

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <RoughSolution
            roughSolutions={[
               {
                  language: 'JAVA',
                  solutionContent: "System.out.println('iB Hubs')",
                  fileName: 'welcome.java',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: '',
                  fileName: '',
                  uniqueId: 1
               }
            ]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={showToastMessageMockFunction}
            resetRoughSolutions={() => {}}
         />
      )

      const saveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })

   it('should render loader while saving data', async () => {
      codingProblemsStore.codingProblemId = 10

      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <RoughSolution
            roughSolutions={[
               {
                  language: 'JAVA',
                  solutionContent: "System.out.println('iB Hubs')",
                  fileName: 'welcome.java',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={() => {}}
            resetRoughSolutions={() => {}}
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
      })
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <RoughSolution
            roughSolutions={[
               {
                  language: 'JAVA',
                  solutionContent: "System.out.println('iB Hubs')",
                  fileName: 'welcome.java',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={showToastMessageMockFunction}
            resetRoughSolutions={() => {}}
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
         <RoughSolution
            roughSolutions={[
               {
                  language: 'JAVA',
                  solutionContent: "System.out.println('iB Hubs')",
                  fileName: 'welcome.java',
                  uniqueId: 0
               },
               {
                  language: 'PYTHON',
                  solutionContent: 'import math',
                  fileName: 'sample.py',
                  uniqueId: 1
               }
            ]}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={onSelectTabMockFunction}
            currentTabIndex={2}
            updateDataStatus={() => {}}
            tabName={ROUGH_SOLUTION}
            showToastMessage={showToastMessageMockFunction}
            resetRoughSolutions={() => {}}
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
