import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'

import { CodingProblemItem } from '../CodingProblemItem'

import {
   CodingProblemsListContainer,
   ListHeader,
   HeaderTextLabel,
   FirstColumn,
   SecondColumn,
   ThirdColumn,
   FourthColumn,
   SixthColumn,
   FifthColumn,
   CodingProblemsItemList,
   QuestionsTitle
} from './styledComponents'

type CodingProblemsListProps = {
   codingProblemsList: any
   navigateToCodingProblemDetailsPage: any
}

@observer
class CodingProblemsList extends React.Component<CodingProblemsListProps> {
   renderCodingProblems = () => {
      const {
         codingProblemsList,
         navigateToCodingProblemDetailsPage
      } = this.props
      return codingProblemsList.map(codingProblem => {
         return (
            <CodingProblemItem
               key={codingProblem.uniqueId}
               codingProblem={codingProblem}
               navigateToCodingProblemDetailsPage={
                  navigateToCodingProblemDetailsPage
               }
            />
         )
      })
   }

   render() {
      const { codingProblemsList } = i18n
      return (
         <CodingProblemsListContainer>
            <ListHeader>
               <FirstColumn>
                  <QuestionsTitle>
                     <HeaderTextLabel>
                        {codingProblemsList.questions}
                     </HeaderTextLabel>
                  </QuestionsTitle>
               </FirstColumn>
               <SecondColumn>
                  <HeaderTextLabel>
                     {codingProblemsList.roughSolution}
                  </HeaderTextLabel>
               </SecondColumn>
               <ThirdColumn>
                  <HeaderTextLabel>
                     {codingProblemsList.testCases}
                  </HeaderTextLabel>
               </ThirdColumn>
               <FourthColumn>
                  <HeaderTextLabel>
                     {codingProblemsList.prefilledCode}
                  </HeaderTextLabel>
               </FourthColumn>
               <FifthColumn>
                  <HeaderTextLabel>
                     {codingProblemsList.solutionApproach}
                  </HeaderTextLabel>
               </FifthColumn>
               <SixthColumn>
                  <HeaderTextLabel>
                     {codingProblemsList.cleanSolution}
                  </HeaderTextLabel>
               </SixthColumn>
            </ListHeader>
            <CodingProblemsItemList>
               {this.renderCodingProblems()}
            </CodingProblemsItemList>
         </CodingProblemsListContainer>
      )
   }
}

export { CodingProblemsList }
