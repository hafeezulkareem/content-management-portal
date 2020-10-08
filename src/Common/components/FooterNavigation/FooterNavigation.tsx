import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'
import images from '../../themes/Images'

import { ButtonWithIcon } from '../ButtonWithIcon'
import { Pagination } from '../Pagination'

import {
   FooterNavigationContainer,
   PageDetailsContainer,
   PageDetails
} from './styledComponents'

interface FooterNavigationProps {
   buttonText: string
   onClickAddButton: () => void
   currentCodingProblemsPage: number
   totalCodingProblemsPageCount: number
   onClickPreviousPaginationButton: () => void
   onClickPaginationNumberButton: (pageNumber: number) => void
   onClickNextPaginationButton: () => void
}

@observer
class FooterNavigation extends React.Component<FooterNavigationProps> {
   render() {
      const {
         buttonText,
         onClickAddButton,
         currentCodingProblemsPage,
         totalCodingProblemsPageCount,
         onClickPreviousPaginationButton,
         onClickPaginationNumberButton,
         onClickNextPaginationButton
      } = this.props
      const { page, of, imageAlts } = i18n
      return (
         <FooterNavigationContainer>
            <ButtonWithIcon
               iconURL={images.plus}
               iconAltText={imageAlts.plusIcon}
               buttonText={buttonText}
               onClickButton={onClickAddButton}
               isDisabled={false}
            />
            <PageDetailsContainer>
               <PageDetails>
                  {page}{' '}
                  {totalCodingProblemsPageCount > 0
                     ? currentCodingProblemsPage
                     : 0}{' '}
                  {of} {totalCodingProblemsPageCount}
               </PageDetails>
            </PageDetailsContainer>
            <Pagination
               totalPageCount={totalCodingProblemsPageCount}
               currentPageNumber={currentCodingProblemsPage}
               onClickPreviousButton={onClickPreviousPaginationButton}
               onClickNumberButton={onClickPaginationNumberButton}
               onClickNextButton={onClickNextPaginationButton}
            />
         </FooterNavigationContainer>
      )
   }
}

export { FooterNavigation }
