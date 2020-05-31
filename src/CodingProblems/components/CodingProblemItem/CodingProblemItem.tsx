import React from 'react'
import { observer } from 'mobx-react'

import images from '../../../Common/themes/Images'

import { CODING_PROBLEM_ITEM_TEST_ID } from '../../constants/IdConstants'

import {
   FirstColumn,
   SecondColumn,
   ThirdColumn,
   FourthColumn,
   FifthColumn,
   SixthColumn
} from '../CodingProblemsList/styledComponents'

import {
   CodingQuestionItem,
   DummyCheckbox,
   Icon,
   QuestionText
} from './styledComponents'

type CodingProblemItemProps = {
   codingProblem: any
   navigateToCodingProblemDetailsPage: any
}

@observer
class CodingProblemItem extends React.Component<CodingProblemItemProps> {
   getStatusImage = (isCompleted: boolean) => {
      if (isCompleted) {
         return <Icon alt='Tick' src={images.completedCheck} />
      }
      return <Icon alt='Cross' src={images.unCompletedCheck} />
   }

   render() {
      const { codingProblem, navigateToCodingProblemDetailsPage } = this.props
      let { problemStatement } = codingProblem
      problemStatement =
         problemStatement.length > 62
            ? problemStatement.slice(0, 62) + '...'
            : problemStatement
      return (
         <CodingQuestionItem
            onClick={() => navigateToCodingProblemDetailsPage(codingProblem.id)}
            data-testid={CODING_PROBLEM_ITEM_TEST_ID}
         >
            <FirstColumn>
               <DummyCheckbox>
                  <Icon alt='Tick' src={images.defaultCheck} />
               </DummyCheckbox>
               <QuestionText>{problemStatement}</QuestionText>
            </FirstColumn>
            <SecondColumn>
               {this.getStatusImage(codingProblem.isRoughSolutionCompleted)}
            </SecondColumn>
            <ThirdColumn>
               {this.getStatusImage(codingProblem.isTestCasesCompleted)}
            </ThirdColumn>
            <FourthColumn>
               {this.getStatusImage(codingProblem.isPrefilledCodeCompleted)}
            </FourthColumn>
            <FifthColumn>
               {this.getStatusImage(codingProblem.isSolutionApproachCompleted)}
            </FifthColumn>
            <SixthColumn>
               {this.getStatusImage(codingProblem.isCleanSolutionCompleted)}
            </SixthColumn>
         </CodingQuestionItem>
      )
   }
}

export { CodingProblemItem }
