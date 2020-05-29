import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { BUTTON_WITH_ICON_TEST_ID } from '../../constants/IdConstants'

import { ButtonWithIcon } from '.'

describe('ButtonWithIcon tests', () => {
   it('should render button with given text', () => {
      const { getByText } = render(
         <ButtonWithIcon
            buttonText='Back to List'
            onClickButton={() => {}}
            iconURL=''
            iconAltText=''
         />
      )

      expect(getByText(/back to list/i)).toBeInTheDocument()
   })

   it('should render button icon with given alt text', () => {
      const { getByAltText } = render(
         <ButtonWithIcon
            buttonText=''
            onClickButton={() => {}}
            iconURL=''
            iconAltText='back button icon'
         />
      )

      expect(getByAltText(/back button icon/i)).toBeInTheDocument()
   })

   it('should invoke click function on click button', () => {
      const mockClickFunction = jest.fn()

      const { getByTestId } = render(
         <ButtonWithIcon
            buttonText=''
            onClickButton={mockClickFunction}
            iconURL=''
            iconAltText=''
         />
      )

      const button = getByTestId(BUTTON_WITH_ICON_TEST_ID)
      fireEvent.click(button)

      expect(mockClickFunction).toBeCalled()
   })
})
