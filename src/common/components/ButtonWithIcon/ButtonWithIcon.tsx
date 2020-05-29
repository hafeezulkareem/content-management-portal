import React from 'react'

import { ButtonContainer, ButtonEl, ButtonIcon } from './styledComponents'

type ButtonWithIconProps = {
   buttonText: string
   onClickButton: () => void
   iconURL: string
   iconAltText: string
}

class ButtonWithIcon extends React.Component<ButtonWithIconProps> {
   render() {
      const { buttonText, iconURL, iconAltText, onClickButton } = this.props
      return (
         <ButtonContainer>
            <ButtonEl onClick={onClickButton}>
               <ButtonIcon alt={iconAltText} src={iconURL} />
               {buttonText}
            </ButtonEl>
         </ButtonContainer>
      )
   }
}

export { ButtonWithIcon }
