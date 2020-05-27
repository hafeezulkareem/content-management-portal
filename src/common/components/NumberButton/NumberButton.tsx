import React from 'react'

import { NumberButtonEl } from './styledComponent'

type NumberButtonProps = {
   onClickNumberButton: () => void
   number: number
   isActive: boolean
}

class NumberButton extends React.Component<NumberButtonProps> {
   render() {
      const { onClickNumberButton, number, isActive } = this.props
      return (
         <NumberButtonEl onClick={onClickNumberButton} isActive={isActive}>
            {number}
         </NumberButtonEl>
      )
   }
}

export { NumberButton }
