import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/Images'

import { PaginationButton } from '../PaginationButton.tsx'

import {
   PaginationContainer,
   PreviousAndNextButton,
   Icon
} from './styledComponents'

type PaginationProps = {
   currentPageNumber: number
   totalPageCount: number
   onClickPreviousButton: (event) => void
   onClickNumberButton: (event) => void
   onClickNextButton: (event) => void
}

@observer
class Pagination extends React.Component<PaginationProps> {
   onClickNumberButton = pageNumber => {
      const { onClickNumberButton } = this.props
      onClickNumberButton(pageNumber)
   }

   renderFirstTwoPageNumbers = () => {
      const { currentPageNumber } = this.props
      return (
         <PaginationButton
            isActive={currentPageNumber === 1}
            pageNumber={1}
            onClickButton={() => this.onClickNumberButton(1)}
         />
      )
   }

   renderLastTwoPageNumbers = () => {
      const { currentPageNumber } = this.props
      return (
         <PaginationButton
            isActive={currentPageNumber === 2}
            pageNumber={2}
            onClickButton={() => this.onClickNumberButton(2)}
         />
      )
   }

   render() {
      const {
         currentPageNumber,
         totalPageCount,
         onClickPreviousButton,
         onClickNextButton
      } = this.props
      return (
         <PaginationContainer>
            <PreviousAndNextButton
               onClick={onClickPreviousButton}
               disabled={currentPageNumber === 1}
               isDisabled={currentPageNumber === 1}
            >
               <Icon alt='Chevron Left' src={images.chevronLeft} />
            </PreviousAndNextButton>
            {this.renderFirstTwoPageNumbers()}
            {totalPageCount > 5 ? '...' : null}
            {this.renderLastTwoPageNumbers()}
            <PreviousAndNextButton
               onClick={onClickNextButton}
               disabled={currentPageNumber === totalPageCount}
               isDisabled={currentPageNumber === totalPageCount}
            >
               <Icon alt='Chevron Right' src={images.chevronRight} />
            </PreviousAndNextButton>
         </PaginationContainer>
      )
   }
}

export { Pagination }
