import React from 'react'

import { BUTTON_WITH_ICON_TEST_ID } from '../../constants/IdConstants'

import { ButtonEl, ButtonIcon } from './styledComponents'

type ButtonWithIconProps = {
   buttonText: string
   onClickButton: () => void
   iconURL: string
   iconAltText: string
   isDisabled: boolean
}

class ButtonWithIcon extends React.Component<ButtonWithIconProps> {
   render() {
      const {
         buttonText,
         iconURL,
         iconAltText,
         onClickButton,
         isDisabled
      } = this.props
      return (
         <ButtonEl
            isDisabled={isDisabled}
            disabled={isDisabled}
            onClick={onClickButton}
            data-testid={BUTTON_WITH_ICON_TEST_ID}
         >
            <ButtonIcon alt={iconAltText} src={iconURL} />
            {buttonText}
         </ButtonEl>
      )
   }
}

export { ButtonWithIcon }
