import React from 'react'

import { NumberButtonEl } from './styledComponent'

type NumberButtonProps = {
   onClickNumberButton: () => void
   number: number
}

class NumberButton extends React.Component<NumberButtonProps> {
   render() {
      const { onClickNumberButton, number } = this.props
      return (
         <NumberButtonEl onClick={onClickNumberButton}>{number}</NumberButtonEl>
      )
   }
}

export { NumberButton }
