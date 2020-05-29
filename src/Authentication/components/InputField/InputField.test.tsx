import React from 'react'
import { render } from '@testing-library/react'

import {
   INPUT_FIELD_TEST_ID,
   ERROR_ICON_TEST_ID
} from '../../constants/IdConstants'

import { InputField } from './InputField'

const testText = 'test-text'

describe('SignIn InputField Tests', () => {
   it('should render given text', () => {
      const { getByTestId } = render(
         <InputField
            inputFieldType='text'
            onChangeInput={() => {}}
            inputFieldValue={testText}
            error={null}
         />
      )

      expect(getByTestId(INPUT_FIELD_TEST_ID).value).toBe(testText)
   })

   it('should render error icon', () => {
      const { getByTestId } = render(
         <InputField
            inputFieldType='text'
            onChangeInput={() => {}}
            inputFieldValue='error'
            error='error'
         />
      )

      expect(getByTestId(ERROR_ICON_TEST_ID)).toBeInTheDocument()
   })
})
