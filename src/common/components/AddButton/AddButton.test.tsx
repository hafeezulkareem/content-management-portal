import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { ADD_BUTTON_TEST_ID } from '../../constants/IdConstants'

import { AddButton } from './AddButton'

describe('AddButton tests', () => {
   it('should render add button', () => {
      const { getByText } = render(<AddButton onClickAddButton={() => {}} />)

      expect(getByText(/add/i)).toBeInTheDocument()
   })

   it('should render plus icon', () => {
      const { getByAltText } = render(<AddButton onClickAddButton={() => {}} />)

      expect(getByAltText(/plus icon/i)).toBeInTheDocument()
   })

   it('should invoke click function', () => {
      const mockClickFunction = jest.fn()

      const { getByTestId } = render(
         <AddButton onClickAddButton={mockClickFunction} />
      )

      const addButton = getByTestId(ADD_BUTTON_TEST_ID)
      fireEvent.click(addButton)

      expect(mockClickFunction).toBeCalled()
   })
})
