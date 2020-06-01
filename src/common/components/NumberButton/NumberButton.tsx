import React from 'react'

import images from '../../themes/Images'

import {
   NumberButtonEl,
   NumberButtonContainer,
   NumberButtonRemoveIcon
} from './styledComponent'

type NumberButtonProps = {
   onClickNumberButton: () => void
   number: number
   isActive: boolean
}

class NumberButton extends React.Component<NumberButtonProps> {
   render() {
      const { onClickNumberButton, number, isActive } = this.props
      return (
         <NumberButtonContainer>
            <NumberButtonEl onClick={onClickNumberButton} isActive={isActive}>
               {number}
            </NumberButtonEl>
            <NumberButtonRemoveIcon alt='Remove Icon' src={images.closeRed} />
         </NumberButtonContainer>
      )
   }
}

export { NumberButton }
