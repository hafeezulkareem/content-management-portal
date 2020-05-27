import React from 'react'

import {
   BackButtonContainer,
   BackButtonEl,
   BackButtonIcon
} from './styledComponents'

type BackButtonProps = {
   buttonText: string
   onClickBackButton: () => void
}

class BackButton extends React.Component<BackButtonProps> {
   render() {
      const { buttonText, onClickBackButton } = this.props
      return (
         <BackButtonContainer>
            <BackButtonEl onClick={onClickBackButton}>
               <BackButtonIcon
                  alt='Back Button Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/18d0b955-8ee4-4ac5-a029-92cda10c871e.svg'
               />
               {buttonText}
            </BackButtonEl>
         </BackButtonContainer>
      )
   }
}

export { BackButton }
