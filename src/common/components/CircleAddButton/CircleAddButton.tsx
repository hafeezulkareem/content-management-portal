import React from 'react'

import { CIRCLE_BUTTON_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import { CircleAddButtonEl, PlusImage } from './styledComponents'

type CircleAddButtonProps = {
   onClickCircleAddButton: () => void
}

class CircleAddButton extends React.Component<CircleAddButtonProps> {
   render() {
      const { onClickCircleAddButton } = this.props
      const { imageAlts } = i18n
      return (
         <CircleAddButtonEl
            data-testid={CIRCLE_BUTTON_TEST_ID}
            onClick={onClickCircleAddButton}
         >
            <PlusImage alt={imageAlts.plusIcon} src={images.plusBlue} />
         </CircleAddButtonEl>
      )
   }
}

export { CircleAddButton }
