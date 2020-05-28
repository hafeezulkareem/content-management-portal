import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import commonI18n from '../../../common/i18n/strings.json'
import { AppHeader } from '../../../common/components/AppHeader'
import { BackButton } from '../../../common/components/BackButton'
import { PageTitle } from '../../../common/components/PageTitle'

import i18n from '../../i18n/strings.json'
import { STATEMENT } from '../../constants/TabConstants'

import { Navigator } from '../Navigator'
import { Statement } from '../Statement'
import { TestCases } from '../TestCases'
import { SolutionApproach } from '../SolutionApproach'
import { CleanSolution } from '../CleanSolution'
import { Hints } from '../Hints'

import {
   AppContainer,
   ContentContainer,
   SectionWrapper,
   Wrapper
} from './styledComponents'
import { CodeEditor } from '../../../common/components/CodeEditor'
import { AddAndSaveButtons } from '../AddAndSaveButtons'

@observer
class CreatingFlow extends React.Component {
   @observable activeTab: string = STATEMENT

   goToCodingProblemsHome = () => {}

   onClickTabButton = (newActiveTab: string) => {
      this.activeTab = newActiveTab
   }

   renderRespectiveTabComponent = () => {
      const {
         statement,
         roughSolution,
         testCases,
         prefilledCode,
         solutionApproach,
         cleanSolution,
         hints
      } = i18n.navigator
      switch (this.activeTab) {
         case statement:
            return <Statement />
         case roughSolution:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <CodeEditor code='' programmingLanguage='javascript' />
                     <AddAndSaveButtons />
                  </SectionWrapper>
               </Wrapper>
            )
         case testCases:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <TestCases content='#include <stdio.h>' />
                  </SectionWrapper>
               </Wrapper>
            )
         case prefilledCode:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <CodeEditor code='' programmingLanguage='javascript' />
                     <AddAndSaveButtons />
                  </SectionWrapper>
               </Wrapper>
            )
         case solutionApproach:
            return <SolutionApproach content='' contentType='text' />
         case cleanSolution:
            return (
               <Wrapper>
                  <SectionWrapper>
                     <CleanSolution content='' contentType='javascript' />
                  </SectionWrapper>
               </Wrapper>
            )
         case hints:
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
      let words = this.activeTab.split(' ')
      return words
         .map(word => {
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            return word
         })
         .join(' ')
   }

   render() {
      const { commonLabels } = commonI18n
      const activeTab = this.getCapitalizedActiveTab()
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/696fd949-70d2-4be4-b1ef-a5065b1b1a11@3x.png'
            />
            <ContentContainer>
               <BackButton
                  buttonText={commonLabels.backToList}
                  onClickBackButton={this.goToCodingProblemsHome}
               />
               <PageTitle title={activeTab} />
               <Navigator
                  activeButton={this.activeTab}
                  onClickTabButton={this.onClickTabButton}
               />
               {this.renderRespectiveTabComponent()}
            </ContentContainer>
         </AppContainer>
      )
   }
}

export { CreatingFlow }
