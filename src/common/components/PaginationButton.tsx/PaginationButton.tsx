import React from 'react'
import { observer } from 'mobx-react'

import { ButtonEl } from './styledComponents'

type PaginationButtonProps = {
   pageNumber: number
   isActive: boolean
   onClickButton: any
}

@observer
class PaginationButton extends React.Component<PaginationButtonProps> {
   render() {
      const { pageNumber, isActive, onClickButton } = this.props
      return (
         <ButtonEl isActive={isActive} onClick={onClickButton}>
            {pageNumber}
         </ButtonEl>
      )
   }
}

export { PaginationButton }
