import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'
import { withRouter } from 'react-router-dom'

import commonI18n from '../../../Common/i18n/strings.json'
import { AppHeader } from '../../../Common/components/AppHeader'
import { ButtonWithIcon } from '../../../Common/components/ButtonWithIcon'
import { PageTitle } from '../../../Common/components/PageTitle'
import images from '../../../Common/themes/Images'

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
   BackButtonContainer
} from './styledComponents'

type CreatingFlowProps = {
   codingProblemsStore: any
   navigateToCodingProblemsHome: any
   match: any
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

   componentDidMount() {
      const {
         match: {
            params: { codingProblemId }
         }
      } = this.props
      const { create } = i18n as any
      if (codingProblemId !== create) {
         const { codingProblemsStore } = this.props
         codingProblemsStore.getCodingProblemDetails(codingProblemId)
      }
   }

   componentWillUnmount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.codingProblemDetails = undefined
   }

   confirmDataStatus = () => {
      if (!this.isDataSaved) {
         return window.confirm('Data is not saved. Are you sure want to leave?')
      }
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

   renderRespectiveTabComponent = () => {
      const { codingProblemsStore } = this.props
      const { codingProblemDetails } = codingProblemsStore
      let codingProblemId: number | null = null,
         statement,
         roughSolutions,
         testCases
      if (codingProblemDetails) {
         codingProblemId = codingProblemDetails.codingProblemId
         statement = codingProblemDetails.statement
         roughSolutions = codingProblemDetails.roughSolutions
         testCases = codingProblemDetails.testCases
      }
      switch (this.selectedTabIndex) {
         case 1:
            return (
               <Statement
                  codingProblemId={codingProblemId}
                  statementDetails={statement}
                  codingProblemsStore={codingProblemsStore}
                  onSelectTab={this.onSelectTab}
                  currentTabIndex={this.selectedTabIndex}
                  updateDataStatus={this.updateDataStatus}
               />
            )
         case 2:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <RoughSolution
                        codingProblemId={codingProblemId}
                        roughSolutions={roughSolutions}
                        key={ROUGH_SOLUTION}
                        codingProblemsStore={codingProblemsStore}
                        onSelectTab={this.onSelectTab}
                        currentTabIndex={this.selectedTabIndex}
                        updateDataStatus={this.updateDataStatus}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 3:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <TestCases
                        codingProblemStore={codingProblemsStore}
                        testCases={testCases}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 4:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <RoughSolution
                        codingProblemId={codingProblemId}
                        roughSolutions={roughSolutions}
                        key={PREFILLED_CODE}
                        codingProblemsStore={codingProblemsStore}
                        onSelectTab={this.onSelectTab}
                        currentTabIndex={this.selectedTabIndex}
                        updateDataStatus={this.updateDataStatus}
                     />
                  </SectionWrapper>
               </Wrapper>
            )
         case 5:
            return (
               <SolutionApproach
                  codingProblemsStore={codingProblemsStore}
                  onSelectTab={this.onSelectTab}
                  currentTabIndex={this.selectedTabIndex}
               />
            )
         case 6:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <CleanSolution content='' contentType='javascript' />
                  </SectionWrapper>
               </Wrapper>
            )
         case 7:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <Hints />
                  </SectionWrapper>
               </Wrapper>
            )
      }
   }

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

   updateDataStatus = updatedContent => {
      if (!updatedContent) {
         this.isDataSaved = true
      } else {
         this.isDataSaved = false
      }
   }

   render() {
      const { commonLabels } = commonI18n
      const activeTab = this.getCapitalizedActiveTab()
      const { codingProblemsStore, navigateToCodingProblemsHome } = this.props
      const { getCodingProblemDetailsAPIStatus } = codingProblemsStore
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink={images.testingUserPic}
            />
            <ContentContainer>
               <BackButtonContainer>
                  <ButtonWithIcon
                     iconURL={images.chevronLeft}
                     iconAltText='Back Arrow Icon'
                     buttonText={commonLabels.backToList}
                     onClickButton={navigateToCodingProblemsHome}
                  />
               </BackButtonContainer>
               <PageTitle title={activeTab} />
               <Navigator
                  tabDetails={this.tabDetails}
                  onSelectTab={this.onSelectTab}
               />
               {getCodingProblemDetailsAPIStatus !== API_FETCHING
                  ? this.renderRespectiveTabComponent()
                  : 'Loading...'}
            </ContentContainer>
         </AppContainer>
      )
   }
}

const CreatingFlowWithRouter = withRouter(CreatingFlow)

export { CreatingFlowWithRouter }
