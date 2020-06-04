import React from 'react'

import images from '../../../Common/themes/Images'
import commonI18n from '../../../Common/i18n/strings.json'

import {
   INPUT_FIELD_TEST_ID,
   ERROR_ICON_TEST_ID
} from '../../constants/IdConstants'

import {
   InputFieldWrapper,
   InputFieldEl,
   InputFieldErrorIcon
} from './styledComponents'

type InputFieldProps = {
   inputFieldType: string
   inputFieldValue: string
   onChangeInput: (any) => void
   error: string | null
}

class InputField extends React.Component<InputFieldProps> {
   render() {
      const { imageAlts } = commonI18n
      const {
         inputFieldType,
         onChangeInput,
         inputFieldValue,
         error
      } = this.props
      return (
         <InputFieldWrapper error={error}>
            <InputFieldEl
               data-testid={INPUT_FIELD_TEST_ID}
               value={inputFieldValue}
               onChange={onChangeInput}
               type={inputFieldType}
               error={error}
            />
            {error && (
               <InputFieldErrorIcon
                  data-testid={ERROR_ICON_TEST_ID}
                  alt={imageAlts.errorIcon}
                  src={images.error}
               />
            )}
         </InputFieldWrapper>
      )
   }
}

export { InputField }
