import React from 'react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'
import { NUMBER_BUTTON_TEST_ID } from '../../constants/IdConstants'

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
   uniqueId: string
}

class NumberButton extends React.Component<NumberButtonProps> {
   render() {
      const {
         onClickNumberButton,
         onClickRemoveIcon,
         number,
         isActive,
         uniqueId
      } = this.props
      const { imageAlts } = i18n
      return (
         <NumberButtonContainer>
            <NumberButtonEl
               data-testid={NUMBER_BUTTON_TEST_ID}
               onClick={() => onClickNumberButton(uniqueId)}
               isActive={isActive}
            >
               {number}
            </NumberButtonEl>
            <NumberButtonRemoveIcon
               alt={imageAlts.removeIcon}
               src={images.closeRed}
               onClick={() => onClickRemoveIcon(uniqueId)}
            />
         </NumberButtonContainer>
      )
   }
}

export { NumberButton }
