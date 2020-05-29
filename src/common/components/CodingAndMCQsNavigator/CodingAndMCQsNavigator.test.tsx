import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { CodingAndMCQsNavigator } from '.'

describe('CodingAndMCQsNavigator tests', () => {
   it('should render two buttons', () => {
      const { getByRole } = render(
         <CodingAndMCQsNavigator
            activeSection='CODING_LIST'
            onClickCodingButton={() => {}}
            onClickMCQsButton={() => {}}
         />
      )

      expect(getByRole('button', { name: /mcqs list/i })).toBeInTheDocument()
      expect(
         getByRole('button', { name: /coding questions list/i })
      ).toBeInTheDocument()
   })

   it('should invoke MCQs click function', () => {
      const mockClickFunction = jest.fn()

      const { getByRole } = render(
         <CodingAndMCQsNavigator
            activeSection='CODING_LIST'
            onClickCodingButton={() => {}}
            onClickMCQsButton={mockClickFunction}
         />
      )

      const mcqsButton = getByRole('button', { name: /mcqs list/i })
      fireEvent.click(mcqsButton)

      expect(mockClickFunction).toBeCalled()
   })

   it('should invoke MCQs click function', () => {
      const mockClickFunction = jest.fn()

      const { getByRole } = render(
         <CodingAndMCQsNavigator
            activeSection='MCQS_LIST'
            onClickCodingButton={mockClickFunction}
            onClickMCQsButton={() => {}}
         />
      )

      const codingButton = getByRole('button', {
         name: /coding questions list/i
      })
      fireEvent.click(codingButton)

      expect(mockClickFunction).toBeCalled()
   })
})
