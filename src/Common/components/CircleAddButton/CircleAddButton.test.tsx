import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { CIRCLE_BUTTON_TEST_ID } from '../../constants/IdConstants'

import { CircleAddButton } from './CircleAddButton'

describe('CircleAddButton tests', () => {
   it('should render circle add button', () => {
      const { getByTestId } = render(
         <CircleAddButton onClickCircleAddButton={() => {}} />
      )

      expect(getByTestId(CIRCLE_BUTTON_TEST_ID)).toBeInTheDocument()
   })

   it('should invoke click function on click button', () => {
      const mockClickFunction = jest.fn()

      const { getByTestId } = render(
         <CircleAddButton onClickCircleAddButton={mockClickFunction} />
      )

      const button = getByTestId(CIRCLE_BUTTON_TEST_ID)
      fireEvent.click(button)

      expect(mockClickFunction).toBeCalled()
   })
})
