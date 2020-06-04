import React from 'react'
import { observer } from 'mobx-react'

import { AppHeader } from '../../../Common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../Common/components/CodingAndMCQsNavigator'
import { FooterNavigation } from '../../../Common/components/FooterNavigation'
import { SelectList } from '../../../Common/components/SelectList'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import images from '../../../Common/themes/Images'

import i18n from '../../i18n/strings.json'
import { CODING_PROBLEMS_LIMIT_PER_PAGE } from '../../constants/APILimitConstants'

import { CodingProblemsList } from '../CodingProblemsList'

import { AppContainer, LoadingWrapperAndProblemsList } from './styledComponents'

type CodingProblemsHomeProps = {
   codingProblemsStore: any
   activeSection: string
   navigateToCodingProblemCreatingFlow: any
   navigateToCodingProblemDetailsPage: any
}

@observer
class CodingProblemsHome extends React.Component<CodingProblemsHomeProps> {
   componentDidMount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.getCodingProblems()
   }

   getCodingProblemsStore = () => {
      return this.props.codingProblemsStore
   }

   getCodingProblems = () => {
      this.getCodingProblemsStore().getCodingProblems()
   }

   renderSuccessUI = () => {
      const { codingProblemsList } = this.getCodingProblemsStore()
      const { navigateToCodingProblemDetailsPage } = this.props
      let codingProblemsListArray = Array.from(codingProblemsList.values())
      return (
         <CodingProblemsList
            codingProblemsList={codingProblemsListArray}
            navigateToCodingProblemDetailsPage={
               navigateToCodingProblemDetailsPage
            }
         />
      )
   }

   onClickPreviousPaginationButton = () => {
      const { codingProblemsStore } = this.props
      codingProblemsStore.decrementPageNumber(CODING_PROBLEMS_LIMIT_PER_PAGE)
   }

   onClickNextPaginationButton = () => {
      const { codingProblemsStore } = this.props
      codingProblemsStore.incrementPageNumber(CODING_PROBLEMS_LIMIT_PER_PAGE)
   }

   onClickPaginationNumberButton = pageNumber => {
      const { codingProblemsStore } = this.props
      codingProblemsStore.updateCodingProblemsOffsetValue(
         pageNumber,
         CODING_PROBLEMS_LIMIT_PER_PAGE
      )
   }

   render() {
      const {
         codingProblemsStore,
         activeSection,
         navigateToCodingProblemCreatingFlow
      } = this.props
      const {
         getCodingProblemsAPIStatus,
         getCodingProblemsAPIError,
         totalCodingProblems,
         currentCodingProblemsPage
      } = codingProblemsStore
      const { addCodingQuestions } = i18n as any
      const totalCodingProblemsPageCount =
         totalCodingProblems > 0
            ? Math.ceil(totalCodingProblems / CODING_PROBLEMS_LIMIT_PER_PAGE)
            : 0
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink={images.testingUserPic}
            />
            <CodingAndMCQsNavigator
               activeSection={activeSection}
               onClickMCQsButton={() => {}}
               onClickCodingButton={() => {}}
            />
            <SelectList isSelected={false} onSelect={() => {}} />
            <LoadingWrapperAndProblemsList>
               <LoadingWrapperWithFailure
                  apiStatus={getCodingProblemsAPIStatus}
                  apiError={getCodingProblemsAPIError}
                  onRetryClick={this.getCodingProblems}
                  renderSuccessUI={this.renderSuccessUI}
               />
            </LoadingWrapperAndProblemsList>
            <FooterNavigation
               currentCodingProblemsPage={currentCodingProblemsPage}
               totalCodingProblemsPageCount={totalCodingProblemsPageCount}
               onClickPreviousPaginationButton={
                  this.onClickPreviousPaginationButton
               }
               onClickPaginationNumberButton={
                  this.onClickPaginationNumberButton
               }
               onClickNextPaginationButton={this.onClickNextPaginationButton}
               buttonText={addCodingQuestions}
               onClickAddButton={navigateToCodingProblemCreatingFlow}
            />
         </AppContainer>
      )
   }
}

export { CodingProblemsHome }
