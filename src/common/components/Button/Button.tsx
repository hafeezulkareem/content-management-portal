import React from 'react'

import { ButtonEl } from './styledComponents'

type ButtonProps = {
   backgroundColor: string
   textColor: string
   buttonText: string
   onClickButton: (any) => void
}

class Button extends React.Component<ButtonProps> {
   render() {
      const {
         onClickButton,
         backgroundColor,
         textColor,
         buttonText
      } = this.props
      return (
         <ButtonEl
            onClick={onClickButton}
            backgroundColor={backgroundColor}
            textColor={textColor}
         >
            {buttonText}
         </ButtonEl>
      )
   }
}

export { Button }
