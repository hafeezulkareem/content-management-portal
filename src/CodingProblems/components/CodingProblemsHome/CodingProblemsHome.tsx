import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'

import { AppHeader } from '../../../common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../common/components/CodingAndMCQsNavigator'
import { FooterNavigation } from '../../../common/components/FooterNavigation'
import { SelectList } from '../../../common/components/SelectList'
import LoadingWrapperWithFailure from '../../../common/components/LoadingWrapperWithFailure'

import i18n from '../../i18n/strings.json'
import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'
import { CODING_PROBLEMS_LIMIT_PER_PAGE } from '../../constants/APILimitConstants'

import { CodingProblemsList } from '../CodingProblemsList'

import { AppContainer } from './styledComponents'

type CodingProblemsHomeProps = {
   codingProblemsStore: any
   activeSection: string
   history: History
}

@observer
class CodingProblemsHome extends React.Component<CodingProblemsHomeProps> {
   componentDidMount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.getCodingProblems()
   }

   goToCodingProblemCreatingFlow = () => {
      const { history } = this.props
      history.push(CODING_PROBLEM_CREATE_PATH)
   }

   getCodingProblemsStore = () => {
      return this.props.codingProblemsStore
   }

   getCodingProblems = () => {
      this.getCodingProblemsStore().getCodingProblems()
   }

   renderSuccessUI = () => {
      const { codingProblemsList } = this.getCodingProblemsStore()
      let codingProblemsListArray = Array.from(codingProblemsList.values())
      return <CodingProblemsList codingProblemsList={codingProblemsListArray} />
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
      const { codingProblemsStore, activeSection } = this.props
      const {
         getCodingProblemsAPIStatus,
         getCodingProblemsAPIError,
         totalCodingProblems,
         currentCodingProblemsPage
      } = codingProblemsStore
      const { addCodingQuestions } = i18n as any
      const totalCodingProblemsPageCount = Math.ceil(
         totalCodingProblems / CODING_PROBLEMS_LIMIT_PER_PAGE
      )
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/696fd949-70d2-4be4-b1ef-a5065b1b1a11@3x.png'
            />
            <CodingAndMCQsNavigator
               activeSection={activeSection}
               onClickMCQsButton={() => {}}
               onClickCodingButton={() => {}}
            />
            <SelectList isSelected={false} onSelect={() => {}} />
            <LoadingWrapperWithFailure
               apiStatus={getCodingProblemsAPIStatus}
               apiError={getCodingProblemsAPIError}
               onRetryClick={this.getCodingProblems}
               renderSuccessUI={this.renderSuccessUI}
            />
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
               onClickAddButton={this.goToCodingProblemCreatingFlow}
            />
         </AppContainer>
      )
   }
}

const CodingProblemsHomeWithRouter = withRouter(CodingProblemsHome)

export { CodingProblemsHomeWithRouter }
