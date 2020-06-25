import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { FileNameInputField } from './FileNameInputField'

const fileName = 'sample.py'

describe('FileNameInputField tests', () => {
   it('should render given text', () => {
      const { getByPlaceholderText } = render(
         <FileNameInputField fileName={fileName} onChangeFileName={() => {}} />
      )

      expect(
         (getByPlaceholderText(
            /file name include extension/i
         ) as HTMLInputElement).value
      ).toBe(fileName)
   })

   it('should invoke text change method on text change', () => {
      const mockChangeFunction = jest.fn()

      const { getByPlaceholderText } = render(
         <FileNameInputField
            fileName=''
            onChangeFileName={mockChangeFunction}
         />
      )

      const inputField = getByPlaceholderText(/file name include extension/i)
      fireEvent.change(inputField, { target: { value: fileName } })

      expect(mockChangeFunction).toBeCalled()
   })
})
