import React from 'react'

import { CIRCLE_BUTTON_TEST_ID } from '../../constants/IdConstants'

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
            <PlusImage
               alt='Plus Image'
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/0f31fe44-91e0-4565-8c0b-75617279d16d.svg'
            />
         </CircleAddButtonEl>
      )
   }
}

export { CircleAddButton }
