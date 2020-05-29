import React from 'react'

import { BUTTON_WITH_ICON_TEST_ID } from '../../constants/IdConstants'

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
            <ButtonEl
               onClick={onClickButton}
               data-testid={BUTTON_WITH_ICON_TEST_ID}
            >
               <ButtonIcon alt={iconAltText} src={iconURL} />
               {buttonText}
            </ButtonEl>
         </ButtonContainer>
      )
   }
}

export { ButtonWithIcon }
