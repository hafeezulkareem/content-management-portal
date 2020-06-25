import React from 'react'
import { observer } from 'mobx-react'

import { ButtonEl } from './styledComponents'

interface PaginationButtonProps {
   pageNumber: number
   isActive: boolean
   onClickButton: () => void
}

@observer
class PaginationButton extends React.Component<PaginationButtonProps> {
   render() {
      const { pageNumber, isActive, onClickButton } = this.props
      return (
         <ButtonEl
            disabled={isActive}
            isActive={isActive}
            onClick={onClickButton}
         >
            {pageNumber}
         </ButtonEl>
      )
   }
}

export { PaginationButton }
