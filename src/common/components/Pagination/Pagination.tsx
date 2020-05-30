import React from 'react'

import {
   PAGINATION_PREVIOUS_BUTTON_TEST_ID,
   PAGINATION_NEXT_BUTTON_TEST_ID
} from '../../constants/IdConstants'

import { PaginationButton } from '../PaginationButton.tsx'

import {
   PaginationContainer,
   PaginatorNavigationButton,
   PaginatorCurrentPageNumber,
   PaginatorTotalPageCount,
   PreviousAndNextButton,
   Icon
} from './styledComponents'

type PaginationProps = {
   currentPageNumber: number
   totalPageCount: number
   onClickPreviousButton: (event) => void
   onClickNextButton: (event) => void
}

class Pagination extends React.Component {
   render() {
      return (
         <PaginationContainer>
            <PreviousAndNextButton>
               <Icon
                  alt='Chevron Left'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/8f995ad9-c0bd-474d-ae07-43e6c9232c53.svg'
               />
            </PreviousAndNextButton>
            <PaginationButton
               isActive={true}
               pageNumber={1}
               onClickButton={() => {}}
            />
            <PaginationButton
               isActive={false}
               pageNumber={2}
               onClickButton={() => {}}
            />
            ...
            <PaginationButton
               isActive={false}
               pageNumber={29}
               onClickButton={() => {}}
            />
            <PaginationButton
               isActive={false}
               pageNumber={30}
               onClickButton={() => {}}
            />
            <PreviousAndNextButton>
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
