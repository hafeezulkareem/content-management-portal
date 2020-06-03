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

type FooterNavigationProps = {
   buttonText: string
   onClickAddButton: any
   currentCodingProblemsPage: number
   totalCodingProblemsPageCount: number
   onClickPreviousPaginationButton: any
   onClickPaginationNumberButton: any
   onClickNextPaginationButton: any
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
      const { page, of } = i18n as any
      return (
         <FooterNavigationContainer>
            <ButtonWithIcon
               iconURL={images.plus}
               iconAltText='Plus Icon'
               buttonText={buttonText}
               onClickButton={onClickAddButton}
               isDisabled={false}
            />
            <PageDetailsContainer>
               <PageDetails>
                  {page} {currentCodingProblemsPage} {of}{' '}
                  {totalCodingProblemsPageCount}
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
