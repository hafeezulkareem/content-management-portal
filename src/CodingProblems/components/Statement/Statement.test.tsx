import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { OVERLAY_LOADER_TEST_ID } from '../../../Common/constants/IdConstants'

import { CodingProblemsFixture } from '../../services/CodingProblemsService/CodingProblemsFixture'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { Statement } from './Statement'

describe('CreatingFlow tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsFixture()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should show short text empty error message in statement', async () => {
      const { getByRole, getByText } = render(
         <Statement
            statementDetails={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={1}
            updateDataStatus={() => {}}
            showToastMessage={() => {}}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(getByText(/short text is require/i)).toBeInTheDocument()
      })
   })

   it('should show description empty error message in statement', async () => {
      const { getByRole, getByPlaceholderText, getByText } = render(
         <Statement
            statementDetails={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={1}
            updateDataStatus={() => {}}
            showToastMessage={() => {}}
         />
      )

      const statementShortTextInputField = getByPlaceholderText(
         /enter short text/i
      )
      fireEvent.change(statementShortTextInputField, {
         target: { value: 'Testing text' }
      })

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(getByText(/description is require/i)).toBeInTheDocument()
      })
   })

   it('should invoke data update status function', () => {
      const updateDataStatusMockFunction = jest.fn()

      const { getByPlaceholderText } = render(
         <Statement
            statementDetails={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={1}
            updateDataStatus={updateDataStatusMockFunction}
            showToastMessage={() => {}}
         />
      )

      const statementShortTextInputField = getByPlaceholderText(
         /enter short text/i
      )
      fireEvent.change(statementShortTextInputField, {
         target: { value: 'Testing text' }
      })

      expect(updateDataStatusMockFunction).toBeCalled()
   })

   it('should render loader while saving the data', async () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const { getByRole, getByTestId } = render(
         <Statement
            statementDetails={{
               shortText: 'Testing',
               content: '# Sample content for testing',
               contentType: 'MARKDOWN'
            }}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={1}
            updateDataStatus={() => {}}
            showToastMessage={() => {}}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(getByTestId(OVERLAY_LOADER_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should show error message toast on failure', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Error while saving the data'))
      })
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const showToastMessageMockFunction = jest.fn()

      const { getByRole } = render(
         <Statement
            statementDetails={{
               shortText: 'Testing',
               content: '# Sample content for testing',
               contentType: 'MARKDOWN'
            }}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={1}
            updateDataStatus={() => {}}
            showToastMessage={showToastMessageMockFunction}
         />
      )

      const statementSaveButton = getByRole('button', { name: 'Save' })
      fireEvent.click(statementSaveButton)

      await waitFor(() => {
         expect(showToastMessageMockFunction).toBeCalled()
      })
   })

   it('should show success message toast on success and move to next tab', async () => {
      const showToastMessageMockFunction = jest.fn()
      const onSelectTabMockFunction = jest.fn()

      const { getByRole } = render(
         <Statement
            statementDetails={{
               shortText: 'Testing',
               content: '# Sample content for testing',
               contentType: 'MARKDOWN'
            }}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={onSelectTabMockFunction}
            currentTabIndex={1}
            updateDataStatus={() => {}}
            showToastMessage={showToastMessageMockFunction}
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
