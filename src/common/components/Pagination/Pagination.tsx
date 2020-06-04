import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import { PaginationButton } from '../PaginationButton.tsx'

import {
   PaginationContainer,
   PreviousAndNextButton,
   Icon,
   PreviousButton,
   Dots
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

   renderPages = () => {
      const { totalPageCount, currentPageNumber } = this.props
      if (totalPageCount < 5) {
         return (
            <>
               {[...Array(totalPageCount)].map((_, index) => (
                  <PaginationButton
                     key={index + 1}
                     isActive={currentPageNumber === index + 1}
                     pageNumber={index + 1}
                     onClickButton={() => this.onClickNumberButton(index + 1)}
                  />
               ))}
            </>
         )
      } else {
         const firstTwoNumbers: Array<number> = []
         const lastTwoNumbers: Array<number> = []
         firstTwoNumbers.push(currentPageNumber)
         firstTwoNumbers.push(
            currentPageNumber + 1 > totalPageCount ? 1 : currentPageNumber + 1
         )
         let dummy = firstTwoNumbers[0] + (totalPageCount - 2)
         lastTwoNumbers.push(
            dummy > totalPageCount ? dummy - totalPageCount : dummy
         )
         dummy = firstTwoNumbers[1] + (totalPageCount - 2)
         lastTwoNumbers.push(
            dummy > totalPageCount ? dummy - totalPageCount : dummy
         )
         return (
            <>
               {firstTwoNumbers.map(number => (
                  <PaginationButton
                     key={number}
                     isActive={currentPageNumber === number}
                     pageNumber={number}
                     onClickButton={() => this.onClickNumberButton(number)}
                  />
               ))}
               <Dots>...</Dots>
               {lastTwoNumbers.map(number => (
                  <PaginationButton
                     key={number}
                     isActive={currentPageNumber === number}
                     pageNumber={number}
                     onClickButton={() => this.onClickNumberButton(number)}
                  />
               ))}
            </>
         )
      }
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
            <PreviousButton
               onClick={onClickPreviousButton}
               disabled={currentPageNumber === 1 || totalPageCount === 0}
               isDisabled={currentPageNumber === 1 || totalPageCount === 0}
            >
               <Icon alt={imageAlts.chevronLeft} src={images.chevronLeft} />
            </PreviousButton>
            {this.renderPages()}
            <PreviousAndNextButton
               onClick={onClickNextButton}
               disabled={
                  currentPageNumber === totalPageCount || totalPageCount === 0
               }
               isDisabled={
                  currentPageNumber === totalPageCount || totalPageCount === 0
               }
            >
               <Icon alt={imageAlts.chevronRight} src={images.chevronRight} />
            </PreviousAndNextButton>
         </PaginationContainer>
      )
   }
}

export { Pagination }
