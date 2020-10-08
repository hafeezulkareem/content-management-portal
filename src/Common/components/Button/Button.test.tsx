import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Button } from './Button'

describe('Button tests', () => {
   it('should render button with given text', () => {
      const { getByText } = render(
         <Button
            backgroundColor='#000000'
            textColor='#ffffff'
            buttonText='Save'
            onClickButton={() => {}}
         />
      )

      expect(getByText(/save/i)).toBeInTheDocument()
   })

   it('should invoke onClickButton', () => {
      const onClickButtonMockFunction = jest.fn()

      const { getByRole } = render(
         <Button
            backgroundColor='#000000'
            textColor='#ffffff'
            buttonText='Save'
            onClickButton={onClickButtonMockFunction}
         />
      )

      const button = getByRole('button', { name: 'Save' })
      fireEvent.click(button)

      expect(onClickButtonMockFunction).toBeCalled()
   })
})
