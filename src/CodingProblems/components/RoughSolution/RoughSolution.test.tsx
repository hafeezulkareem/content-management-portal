import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
   ADD_BUTTON_TEST_ID,
   DELETE_ICON_TEST_ID
} from '../../../common/constants/IdConstants'

import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { RoughSolution } from './RoughSolution'

describe('RoughSolution tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsAPI()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   // afterEach(() => {
   //    jest.resetAllMocks()
   // })

   it('should add code editor on click add button', async () => {
      const { getByTestId, getAllByPlaceholderText } = render(
         <RoughSolution
            roughSolutions={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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
            roughSolutions={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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
   //          roughSolutions={null}
   //          codingProblemId={null}
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
            roughSolutions={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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
            roughSolutions={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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

   it('should render error message on empty fields', async () => {
      const { getByRole, getByText } = render(
         <RoughSolution
            roughSolutions={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
         />
      )

      const roughSolutionSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(roughSolutionSaveButton)

      await waitFor(() => {
         expect(getByText(/fill all the fields/i)).toBeInTheDocument()
      })
   })
})
