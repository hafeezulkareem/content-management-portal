import React from 'react'

import {
   InputFieldWrapper,
   InputFieldEl,
   InputFieldErrorIcon
} from './styledComponents'

type InputFieldProps = {
   inputFieldType: string
   inputFieldValue: string
   onChangeInput: () => void
   isError: boolean
}

class InputField extends React.Component<InputFieldProps> {
   render() {
      const {
         inputFieldType,
         onChangeInput,
         inputFieldValue,
         isError
      } = this.props
      return (
         <InputFieldWrapper>
            <InputFieldEl
               value={inputFieldValue}
               onChange={onChangeInput}
               type={inputFieldType}
            />
            {isError && (
               <InputFieldErrorIcon
                  alt='Error Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/a68ce0bc-26a7-4037-94f4-f8461b2efea8.svg'
               />
            )}
         </InputFieldWrapper>
      )
   }
}

export { InputField }
