import React from 'react'

import { CIRCLE_BUTTON_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'

import { CircleAddButtonEl, PlusImage } from './styledComponents'

type CircleAddButtonProps = {
   onClickCircleAddButton: () => void
}

class CircleAddButton extends React.Component<CircleAddButtonProps> {
   render() {
      const { onClickCircleAddButton } = this.props
      return (
         <CircleAddButtonEl
            data-testid={CIRCLE_BUTTON_TEST_ID}
            onClick={onClickCircleAddButton}
         >
            <PlusImage alt='Plus Image' src={images.plusBlue} />
         </CircleAddButtonEl>
      )
   }
}

export { CircleAddButton }
