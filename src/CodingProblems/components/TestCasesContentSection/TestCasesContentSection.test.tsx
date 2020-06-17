import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { TEST_CASES_CHECKBOX_TEST_ID } from '../../constants/IdConstants'

import { TestCasesContentSection } from './TestCasesContentSection'

describe('TestCasesContentSection Tests', () => {
   it('should invoke on onchange score', () => {
      const onChangeScoreMockFunction = jest.fn()

      const { getByDisplayValue } = render(
         <TestCasesContentSection
            uniqueId={'1'}
            input={''}
            onChangeInput={() => {}}
            output={''}
            onChangeOutput={() => {}}
            score={16}
            onChangeScore={onChangeScoreMockFunction}
            isHidden={false}
            onToggleIsHidden={() => {}}
            onClickSaveButton={() => {}}
            inputErrorMessage={null}
            outputErrorMessage={null}
            scoreErrorMessage={null}
         />
      )

      const scoreInputElement = getByDisplayValue('16')
      fireEvent.change(scoreInputElement, { target: { value: '20' } })

      expect(onChangeScoreMockFunction).toBeCalled()
   })

   it('should invoke on toggle is hidden', () => {
      const onToggleIsHiddenMockFunction = jest.fn()

      const { getByTestId } = render(
         <TestCasesContentSection
            uniqueId={'1'}
            input={''}
            onChangeInput={() => {}}
            output={''}
            onChangeOutput={() => {}}
            score={0}
            onChangeScore={() => {}}
            isHidden={false}
            onToggleIsHidden={onToggleIsHiddenMockFunction}
            onClickSaveButton={() => {}}
            inputErrorMessage={null}
            outputErrorMessage={null}
            scoreErrorMessage={null}
         />
      )

      const checkbox = getByTestId(TEST_CASES_CHECKBOX_TEST_ID)
      fireEvent.click(checkbox)

      expect(onToggleIsHiddenMockFunction).toBeCalled()
   })
})
