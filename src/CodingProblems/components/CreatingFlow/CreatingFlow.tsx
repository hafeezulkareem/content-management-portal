import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import commonI18n from '../../../Common/i18n/strings.json'
import { AppHeader } from '../../../Common/components/AppHeader'
import { ButtonWithIcon } from '../../../Common/components/ButtonWithIcon'
import { PageTitle } from '../../../Common/components/PageTitle'
import images from '../../../Common/themes/Images'
import { ToastMessage } from '../../../Common/components/ToastMessage'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

import {
   STATEMENT,
   ROUGH_SOLUTION,
   TEST_CASES,
   PREFILLED_CODE,
   CLEAN_SOLUTION,
   HINTS,
   SOLUTION_APPROACH
} from '../../constants/TabConstants'
import i18n from '../../i18n/strings.json'

import { Navigator } from '../Navigator'
import { Statement } from '../Statement'
import { RoughSolution } from '../RoughSolution'
import { TestCases } from '../TestCases'
import { SolutionApproach } from '../SolutionApproach'
import { CleanSolution } from '../CleanSolution'
import { Hints } from '../Hints'

import {
   AppContainer,
   ContentContainer,
   SectionWrapper,
   Wrapper,
   BackButtonContainer,
   LoadingWrapperWithStatement
} from './styledComponents'

type CreatingFlowProps = {
   codingProblemsStore: any
   navigateToCodingProblemsHome: any
   match: any
   onUserSignOut: any
}

@observer
class CreatingFlow extends React.Component<CreatingFlowProps> {
   @observable selectedTabIndex: number = 1
   @observable tabDetails = [
      {
         tabIndex: 1,
         tabName: STATEMENT,
         isSelected: true
      },
      {
         tabIndex: 2,
         tabName: ROUGH_SOLUTION,
         isSelected: false
      },
      {
         tabIndex: 3,
         tabName: TEST_CASES,
         isSelected: false
      },
      {
         tabIndex: 4,
         tabName: PREFILLED_CODE,
         isSelected: false
      },
      {
         tabIndex: 5,
         tabName: SOLUTION_APPROACH,
         isSelected: false
      },
      {
         tabIndex: 6,
         tabName: CLEAN_SOLUTION,
         isSelected: false
      },
      {
         tabIndex: 7,
         tabName: HINTS,
         isSelected: false
      }
   ]
   isDataSaved: boolean = true
   statement
   roughSolutions
   testCases
   prefilledCodes
   solutionApproach
   cleanSolutions
   hints

   constructor(props) {
      super(props)
      this.statement = null
      this.roughSolutions = []
      this.testCases = []
      this.prefilledCodes = []
      this.solutionApproach = null
      this.cleanSolutions = []
      this.hints = []
   }

   resetTestCases = () => {
      const { codingProblemsStore } = this.props
      if (codingProblemsStore.codingProblemDetails) {
         codingProblemsStore.codingProblemDetails.testCases = []
      }
   }

   resetHints = () => {
      const { codingProblemsStore } = this.props
      if (codingProblemsStore.codingProblemDetails) {
         codingProblemsStore.codingProblemDetails.hints = []
      }
   }

   resetCleanSolutions = () => {
      const { codingProblemsStore } = this.props
      if (codingProblemsStore.codingProblemDetails) {
         codingProblemsStore.codingProblemDetails.cleanSolutions = []
      }
   }

   resetRoughSolutions = () => {
      const { codingProblemsStore } = this.props
      if (codingProblemsStore.codingProblemDetails) {
         codingProblemsStore.codingProblemDetails.roughSolutions = []
      }
   }

   resetPrefilledCodes = () => {
      const { codingProblemsStore } = this.props
      if (codingProblemsStore.codingProblemDetails) {
         codingProblemsStore.codingProblemDetails.prefilledCodes = []
      }
   }

   componentDidMount() {
      this.getCodingProblemDetails()
   }

   componentWillUnmount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.codingProblemId = null
      codingProblemsStore.initCodingProblemResponses()
      codingProblemsStore.codingProblemDetails = undefined
   }

   getCodingProblemDetails = () => {
      const {
         match: {
            params: { codingProblemId }
         }
      } = this.props
      const { create } = i18n as any
      const { codingProblemsStore } = this.props
      if (codingProblemId !== create) {
         codingProblemsStore.getCodingProblemDetails(codingProblemId)
      } else {
         codingProblemsStore.getCodingProblemDetailsAPIStatus = API_SUCCESS
      }
   }

   confirmDataStatus = () => {
      const { dataLoseWarning } = i18n
      if (!this.isDataSaved) {
         return window.confirm(dataLoseWarning)
      }
   }

   clearWaitingQueue = () => {
      toast.clearWaitingQueue()
   }

   showToastMessage = (message, isError, duration) => {
      toast(<ToastMessage message={message} isError={isError} />, {
         position: 'bottom-center',
         autoClose: duration,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
      })
   }

   onSelectTab = (tabIndex: number) => {
      if (this.isDataSaved || this.confirmDataStatus()) {
         this.selectedTabIndex = tabIndex
         this.tabDetails.forEach((tab, index) => {
            if (tab.tabIndex === tabIndex) {
               this.tabDetails[index].isSelected = true
            } else {
               this.tabDetails[index].isSelected = false
            }
         })
         this.isDataSaved = true
      }
   }

   renderRespectiveTabComponent = observer(() => {
      const { codingProblemsStore } = this.props
      const { codingProblemDetails } = codingProblemsStore
      if (codingProblemDetails) {
         this.statement = codingProblemDetails.statement
         this.roughSolutions = codingProblemDetails.roughSolutions
         this.testCases = codingProblemDetails.testCases
         this.prefilledCodes = codingProblemDetails.prefilledCodes
         this.solutionApproach = codingProblemDetails.solutionApproach
         this.cleanSolutions = codingProblemDetails.cleanSolutions
         this.hints = codingProblemDetails.hints
      }
      switch (this.selectedTabIndex) {
         case 1:
            return (
               <Statement
                  statementDetails={this.statement}
                  codingProblemsStore={codingProblemsStore}
                  onSelectTab={this.onSelectTab}
                  currentTabIndex={this.selectedTabIndex}
                  updateDataStatus={this.updateDataStatus}
                  showToastMessage={this.showToastMessage}
               />
            )
         case 2:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <RoughSolution
                        roughSolutions={this.roughSolutions}
                        key={ROUGH_SOLUTION}
                        tabName={ROUGH_SOLUTION}
                        codingProblemsStore={codingProblemsStore}
                        onSelectTab={this.onSelectTab}
                        currentTabIndex={this.selectedTabIndex}
                        updateDataStatus={this.updateDataStatus}
                        showToastMessage={this.showToastMessage}
                        resetRoughSolutions={this.resetRoughSolutions}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 3:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <TestCases
                        codingProblemsStore={codingProblemsStore}
                        testCases={this.testCases}
                        showToastMessage={this.showToastMessage}
                        updateDataStatus={this.updateDataStatus}
                        resetTestCases={this.resetTestCases}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 4:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <RoughSolution
                        roughSolutions={this.prefilledCodes}
                        key={PREFILLED_CODE}
                        tabName={PREFILLED_CODE}
                        codingProblemsStore={codingProblemsStore}
                        onSelectTab={this.onSelectTab}
                        currentTabIndex={this.selectedTabIndex}
                        updateDataStatus={this.updateDataStatus}
                        showToastMessage={this.showToastMessage}
                        resetRoughSolutions={this.resetPrefilledCodes}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 5:
            return (
               <SolutionApproach
                  codingProblemsStore={codingProblemsStore}
                  solutionApproach={this.solutionApproach}
                  onSelectTab={this.onSelectTab}
                  currentTabIndex={this.selectedTabIndex}
                  showToastMessage={this.showToastMessage}
                  updateDataStatus={this.updateDataStatus}
               />
            )
         case 6:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <CleanSolution
                        codingProblemsStore={codingProblemsStore}
                        cleanSolutions={this.cleanSolutions}
                        onSelectTab={this.onSelectTab}
                        currentTabIndex={this.selectedTabIndex}
                        showToastMessage={this.showToastMessage}
                        updateDataStatus={this.updateDataStatus}
                        resetCleanSolutions={this.resetCleanSolutions}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 7:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <Hints
                        codingProblemsStore={codingProblemsStore}
                        hints={this.hints}
                        showToastMessage={this.showToastMessage}
                        updateDataStatus={this.updateDataStatus}
                        resetHints={this.resetHints}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         default:
            return (
               <Statement
                  statementDetails={this.statement}
                  codingProblemsStore={codingProblemsStore}
                  onSelectTab={this.onSelectTab}
                  currentTabIndex={this.selectedTabIndex}
                  updateDataStatus={this.updateDataStatus}
                  showToastMessage={this.showToastMessage}
               />
            )
      }
   })

   getCapitalizedActiveTab = () => {
      const selectedTab = this.tabDetails.find(tab => tab.isSelected)
      let words = selectedTab?.tabName.split('_')
      return words
         ?.map(word => {
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            return word
         })
         .join(' ')
   }

   updateDataStatus = isDataSaved => {
      this.isDataSaved = isDataSaved
   }

   render() {
      const { commonLabels, imageAlts } = commonI18n
      const activeTab = this.getCapitalizedActiveTab()
      const {
         codingProblemsStore,
         navigateToCodingProblemsHome,
         onUserSignOut
      } = this.props
      const {
         getCodingProblemDetailsAPIStatus,
         getCodingProblemDetailsAPIError
      } = codingProblemsStore
      return (
         <AppContainer>
            <ToastContainer closeButton={false} limit={5} transition={Slide} />
            <AppHeader
               onClickSignOut={onUserSignOut}
               username='Chi Lee'
               userProfilePicLink={images.testingUserPic}
            />
            <ContentContainer>
               <BackButtonContainer>
                  <ButtonWithIcon
                     iconURL={images.chevronLeft}
                     iconAltText={imageAlts.backArrowIcon}
                     buttonText={commonLabels.backToList}
                     onClickButton={navigateToCodingProblemsHome}
                     isDisabled={
                        getCodingProblemDetailsAPIStatus === API_FETCHING
                     }
                  />
               </BackButtonContainer>
               <PageTitle title={activeTab} />
               <Navigator
                  tabDetails={this.tabDetails}
                  onSelectTab={this.onSelectTab}
                  areButtonsDisabled={
                     getCodingProblemDetailsAPIStatus === API_FETCHING
                  }
               />
               <LoadingWrapperWithStatement
                  isLoading={
                     getCodingProblemDetailsAPIStatus === API_FETCHING ||
                     getCodingProblemDetailsAPIStatus === API_FAILED
                  }
               >
                  <LoadingWrapperWithFailure
                     apiStatus={getCodingProblemDetailsAPIStatus}
                     apiError={getCodingProblemDetailsAPIError}
                     onRetryClick={this.getCodingProblemDetails}
                     renderSuccessUI={this.renderRespectiveTabComponent}
                  />
               </LoadingWrapperWithStatement>
            </ContentContainer>
         </AppContainer>
      )
   }
}

const CreatingFlowWithRouter = withRouter(CreatingFlow)

export { CreatingFlowWithRouter }
