import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'

import { Statement } from './Statement'

describe('CreatingFlow tests', () => {
   let codingProblemsAPI, codingProblemsStore

   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsAPI()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should show short text empty error message in statement', async () => {
      const { getByRole, getByText } = render(
         <Statement
            statementDetails={null}
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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
            codingProblemId={null}
            codingProblemsStore={codingProblemsStore}
            onSelectTab={() => {}}
            currentTabIndex={2}
            updateDataStatus={() => {}}
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

   // it('should move to next tab on success', async () => {
   //    const { getByRole, getByTestId, getByPlaceholderText, debug } = render(
   //       <Router history={createMemoryHistory()}>
   //          <CreatingFlow codingProblemsStore={codingProblemsStore} />
   //       </Router>
   //    )

   //    const statementShortTextInputField = getByPlaceholderText(
   //       /enter short text/i
   //    )
   //    fireEvent.change(statementShortTextInputField, {
   //       target: { value: 'Testing text' }
   //    })

   //    const contentEditorContainer: HTMLDivElement = getByTestId(
   //       CONTENT_EDITOR_TEST_ID
   //    ) as HTMLDivElement
   //    const contentEditor: HTMLTextAreaElement = contentEditorContainer
   //       .querySelector('#ace-editor')
   //       ?.querySelector('textarea.ace_text-input') as HTMLTextAreaElement
   //    fireEvent.change(contentEditor, {
   //       target: { value: 'This is testing text' }
   //    })

   //    const statementSaveButton = getByRole('button', { name: 'Save' })
   //    fireEvent.click(statementSaveButton)

   //    debug()

   //    await waitFor(() => {
   //       expect(getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent(
   //          'Rough Solution'
   //       )
   //    })
   // })
})
