import React, { ChangeEvent } from 'react'

import images from '../../../Common/themes/Images'
import commonI18n from '../../../Common/i18n/strings.json'

import { ERROR_ICON_TEST_ID } from '../../constants/IdConstants'

import {
   InputFieldWrapper,
   InputFieldEl,
   InputFieldErrorIcon
} from './styledComponents'

interface InputFieldProps {
   inputFieldType: string
   inputFieldValue: string
   onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
   error: string | null
   id: string
}

class InputField extends React.Component<InputFieldProps> {
   inputFieldRef: React.RefObject<HTMLInputElement>

   constructor(props) {
      super(props)
      this.inputFieldRef = React.createRef()
   }

   render() {
      const { imageAlts } = commonI18n
      const {
         inputFieldType,
         onChangeInput,
         inputFieldValue,
         error,
         id
      } = this.props
      return (
         <InputFieldWrapper error={error}>
            <InputFieldEl
               value={inputFieldValue}
               onChange={onChangeInput}
               type={inputFieldType}
               error={error}
               id={id}
               ref={this.inputFieldRef}
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
