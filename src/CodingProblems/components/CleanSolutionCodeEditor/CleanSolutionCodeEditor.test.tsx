import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { CleanSolutionCodeEditor } from './CleanSolutionCodeEditor'
import { DROP_DOWN_SELECT_TEST_ID } from '../../../Common/constants/IdConstants'

describe('CleanSolutionCodeEditor Tests', () => {
   it('should render clean solution code editor', () => {
      const { getByPlaceholderText } = render(
         <CleanSolutionCodeEditor
            uniqueId={'1'}
            fileName={''}
            onChangeFileName={() => {}}
            language={''}
            onChangeLanguage={() => {}}
            solutionContent={''}
            onChangeSolutionContent={() => {}}
            onClickDeleteButton={() => {}}
         />
      )

      expect(
         getByPlaceholderText(/file name include extension/i)
      ).toBeInTheDocument()
   })

   it('should invoke on file name change', () => {
      const onChangeFileNameMockFunction = jest.fn()

      const { getByPlaceholderText } = render(
         <CleanSolutionCodeEditor
            uniqueId={'1'}
            fileName={''}
            onChangeFileName={onChangeFileNameMockFunction}
            language={''}
            onChangeLanguage={() => {}}
            solutionContent={''}
            onChangeSolutionContent={() => {}}
            onClickDeleteButton={() => {}}
         />
      )

      const fileNameInputElement = getByPlaceholderText(
         /file name include extension/i
      )
      fireEvent.change(fileNameInputElement, { target: { value: 'sample.js' } })

      expect(onChangeFileNameMockFunction).toBeCalled()
   })

   it('should invoke on language change', () => {
      const onChangeLanguageMockFunction = jest.fn()

      const { getByTestId } = render(
         <CleanSolutionCodeEditor
            uniqueId={'1'}
            fileName={''}
            onChangeFileName={() => {}}
            language={''}
            onChangeLanguage={onChangeLanguageMockFunction}
            solutionContent={''}
            onChangeSolutionContent={() => {}}
            onClickDeleteButton={() => {}}
         />
      )

      const dropDown = getByTestId(DROP_DOWN_SELECT_TEST_ID)
      fireEvent.change(dropDown, { target: { value: 'JAVASCRIPT' } })

      expect(onChangeLanguageMockFunction).toBeCalled()
   })
})
