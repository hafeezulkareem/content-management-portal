import React from 'react'
import { render } from '@testing-library/react'

import { ERROR_ICON_TEST_ID } from '../../constants/IdConstants'

import { InputField } from './InputField'

const testText = 'test-text'

describe('SignIn InputField Tests', () => {
   it('should render given text', () => {
      const { getByDisplayValue } = render(
         <InputField
            inputFieldType='text'
            onChangeInput={() => {}}
            inputFieldValue={testText}
            error={null}
            id={'TESTING'}
         />
      )

      expect((getByDisplayValue(/test-text/i) as HTMLInputElement).value).toBe(
         testText
      )
   })

   it('should render error icon', () => {
      const { getByTestId } = render(
         <InputField
            inputFieldType='text'
            onChangeInput={() => {}}
            inputFieldValue='error'
            error='error'
            id={'TESTING'}
         />
      )

      expect(getByTestId(ERROR_ICON_TEST_ID)).toBeInTheDocument()
   })
})
