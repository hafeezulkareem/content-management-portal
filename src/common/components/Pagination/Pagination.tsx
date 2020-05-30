import React from 'react'
import { observer } from 'mobx-react'

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
               <Icon
                  alt='Chevron Left'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/8f995ad9-c0bd-474d-ae07-43e6c9232c53.svg'
               />
            </PreviousAndNextButton>
            {this.renderFirstTwoPageNumbers()}
            {totalPageCount > 5 ? '...' : null}
            {this.renderLastTwoPageNumbers()}
            <PreviousAndNextButton
               onClick={onClickNextButton}
               disabled={currentPageNumber === totalPageCount}
               isDisabled={currentPageNumber === totalPageCount}
            >
               <Icon
                  alt='Chevron Right'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/35a62165-9319-4593-8800-bd8263c83919.svg'
               />
            </PreviousAndNextButton>
         </PaginationContainer>
      )
   }
}

export { Pagination }
