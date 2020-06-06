import React from 'react'

import i18n from '../../i18n/strings.json'

import { ButtonEl } from './styledComponents'

type ButtonProps = {
   backgroundColor: string
   textColor: string
   onClickButton: (any) => void
}

class Button extends React.Component<ButtonProps> {
   render() {
      const { commonComponents } = i18n as any
      const { onClickButton, backgroundColor, textColor } = this.props
      return (
         <ButtonEl
            onClick={onClickButton}
            backgroundColor={backgroundColor}
            textColor={textColor}
         >
            {commonComponents.save}
         </ButtonEl>
      )
   }
}

export { Button }
