import React from 'react'
import { observer } from 'mobx-react'
import { observable, reaction, ObservableMap } from 'mobx'

import { API_SUCCESS, APIStatus } from '@ib/api-constants'

import { AppHeader } from '../../../Common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../Common/components/CodingAndMCQsNavigator'
import { FooterNavigation } from '../../../Common/components/FooterNavigation'
import { SelectList } from '../../../Common/components/SelectList'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { Button } from '../../../Common/components/Button'
import images from '../../../Common/themes/Images'
import colors from '../../../Common/themes/Colors'
import commonI18n from '../../../Common/i18n/strings.json'

import i18n from '../../i18n/strings.json'
import { CODING_PROBLEMS_LIMIT_PER_PAGE } from '../../constants/APILimitConstants'
import { CodingProblemItemModel } from '../../stores/models/CodingProblemItemModel'

import { CodingProblemsList } from '../CodingProblemsList'

import {
   AppContainer,
   LoadingWrapperAndProblemsList,
   DeleteButtonContainer
} from './styledComponents'

interface CodingProblemsHomeProps {
   getCodingProblems: () => void
   getCodingProblemsAPIStatus: APIStatus
   getCodingProblemsAPIError: string | null
   codingProblemsList: ObservableMap<string, CodingProblemItemModel>
   totalCodingProblems: number
   currentCodingProblemsPage: number
   decrementPageNumber: (limit: number) => void
   incrementPageNumber: (limit: number) => void
   updateCodingProblemsOffsetValue: (pageNumber: number, limit: number) => void
   activeSection: string
   navigateToCodingProblemCreatingFlow: () => void
   navigateToCodingProblemDetailsPage: (id: number) => void
   onUserSignOut: () => void
}

@observer
class CodingProblemsHome extends React.Component<CodingProblemsHomeProps> {
   @observable selectedCodingProblems: Array<number>

   constructor(props) {
      super(props)
      this.selectedCodingProblems = []
   }

   componentDidMount() {
      const { getCodingProblems } = this.props
      getCodingProblems()
   }

   renderSuccessUI = () => {
      const { codingProblemsList } = this.props
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
      const { decrementPageNumber } = this.props
      decrementPageNumber(CODING_PROBLEMS_LIMIT_PER_PAGE)
   }

   onClickNextPaginationButton = () => {
      const { incrementPageNumber } = this.props
      incrementPageNumber(CODING_PROBLEMS_LIMIT_PER_PAGE)
   }

   onClickPaginationNumberButton = (pageNumber: number) => {
      const { updateCodingProblemsOffsetValue } = this.props
      updateCodingProblemsOffsetValue(
         pageNumber,
         CODING_PROBLEMS_LIMIT_PER_PAGE
      )
   }

   onChangeGetCodingProblemsAPIStatus = reaction(
      () => {
         const { getCodingProblemsAPIStatus } = this.props
         return getCodingProblemsAPIStatus
      },
      getCodingProblemsAPIStatus => {
         if (getCodingProblemsAPIStatus === API_SUCCESS) {
            this.onChangeSelectedCodingProblems()
         }
      }
   )

   onChangeSelectedCodingProblems = () => {
      reaction(
         () => {
            const { codingProblemsList } = this.props
            return Array.from(codingProblemsList.values()).filter(
               (codingProblem: CodingProblemItemModel) =>
                  codingProblem.isSelected
            )
         },
         selectedCodingProblems => {
            this.selectedCodingProblems = selectedCodingProblems.map(
               (selectedCodingProblem: CodingProblemItemModel) =>
                  selectedCodingProblem.id
            )
         }
      )
   }

   onClickDeleteButton = () => {}

   render() {
      const {
         getCodingProblems,
         getCodingProblemsAPIStatus,
         getCodingProblemsAPIError,
         totalCodingProblems,
         currentCodingProblemsPage,
         activeSection,
         navigateToCodingProblemCreatingFlow,
         onUserSignOut
      } = this.props
      const { addCodingQuestions } = i18n
      const totalCodingProblemsPageCount =
         totalCodingProblems > 0
            ? Math.ceil(totalCodingProblems / CODING_PROBLEMS_LIMIT_PER_PAGE)
            : 0
      const { commonComponents } = commonI18n
      return (
         <AppContainer>
            <AppHeader
               onClickSignOut={onUserSignOut}
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
                  onRetryClick={getCodingProblems}
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
            {this.selectedCodingProblems.length > 0 ? (
               <DeleteButtonContainer>
                  <Button
                     onClickButton={this.onClickDeleteButton}
                     backgroundColor={colors.brightBlue}
                     textColor={colors.white}
                     buttonText={commonComponents.delete}
                  />
               </DeleteButtonContainer>
            ) : null}
         </AppContainer>
      )
   }
}

export default CodingProblemsHome
