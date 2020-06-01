import React from 'react'

import images from '../../themes/Images'

import {
   NumberButtonEl,
   NumberButtonContainer,
   NumberButtonRemoveIcon
} from './styledComponent'

type NumberButtonProps = {
   onClickNumberButton: any
   onClickRemoveIcon: any
   number: number
   isActive: boolean
}

class NumberButton extends React.Component<NumberButtonProps> {
   render() {
      const {
         onClickNumberButton,
         onClickRemoveIcon,
         number,
         isActive
      } = this.props
      return (
         <NumberButtonContainer>
            <NumberButtonEl
               onClick={() => onClickNumberButton(number)}
               isActive={isActive}
            >
               {number}
            </NumberButtonEl>
            <NumberButtonRemoveIcon
               alt='Remove Icon'
               src={images.closeRed}
               onClick={event => onClickRemoveIcon(event, number)}
            />
         </NumberButtonContainer>
      )
   }
}

export { NumberButton }
