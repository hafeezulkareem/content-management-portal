import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

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
      const { imageAlts } = i18n
      return (
         <PaginationContainer>
            <PreviousAndNextButton
               onClick={onClickPreviousButton}
               disabled={currentPageNumber === 1}
               isDisabled={currentPageNumber === 1}
            >
               <Icon alt={imageAlts.chevronLeft} src={images.chevronLeft} />
            </PreviousAndNextButton>
            {this.renderFirstTwoPageNumbers()}
            {totalPageCount > 5 ? '...' : null}
            {this.renderLastTwoPageNumbers()}
            <PreviousAndNextButton
               onClick={onClickNextButton}
               disabled={currentPageNumber === totalPageCount}
               isDisabled={currentPageNumber === totalPageCount}
            >
               <Icon alt={imageAlts.chevronRight} src={images.chevronRight} />
            </PreviousAndNextButton>
         </PaginationContainer>
      )
   }
}

export { Pagination }
