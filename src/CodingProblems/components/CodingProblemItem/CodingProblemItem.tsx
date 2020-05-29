import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'

import { CODING_PROBLEMS_PATH } from '../../../common/constants/RouteConstants'

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
   history: History
}

@observer
class CodingProblemItem extends React.Component<CodingProblemItemProps> {
   navigateToCodingProblemDetailsPage = codingProblemId => {
      const { history } = this.props
      history.push(`${CODING_PROBLEMS_PATH}${codingProblemId}`)
   }

   render() {
      const { codingProblem } = this.props
      let { problemStatement } = codingProblem
      problemStatement =
         problemStatement.length > 62
            ? problemStatement.slice(0, 62) + '...'
            : problemStatement
      return (
         <CodingQuestionItem
            onClick={() =>
               this.navigateToCodingProblemDetailsPage(codingProblem.id)
            }
            data-testid={CODING_PROBLEM_ITEM_TEST_ID}
         >
            <FirstColumn>
               <DummyCheckbox>
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/2d57d0b6-a6f7-4b52-a6c2-b87cf89aa6fd.svg'
                  />
               </DummyCheckbox>
               <QuestionText>{problemStatement}</QuestionText>
            </FirstColumn>
            <SecondColumn>
               {codingProblem.isRoughSolutionCompleted ? (
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/49c9fd24-f8a3-469b-a258-b6e4738c1ad1.svg'
                  />
               ) : (
                  <Icon
                     alt='Cross'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/97ce671d-ae65-46aa-b30b-b31aa41e3d37.svg'
                  />
               )}
            </SecondColumn>
            <ThirdColumn>
               {codingProblem.isTestCasesCompleted ? (
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/49c9fd24-f8a3-469b-a258-b6e4738c1ad1.svg'
                  />
               ) : (
                  <Icon
                     alt='Cross'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/97ce671d-ae65-46aa-b30b-b31aa41e3d37.svg'
                  />
               )}
            </ThirdColumn>
            <FourthColumn>
               {codingProblem.isPrefilledCodeCompleted ? (
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/49c9fd24-f8a3-469b-a258-b6e4738c1ad1.svg'
                  />
               ) : (
                  <Icon
                     alt='Cross'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/97ce671d-ae65-46aa-b30b-b31aa41e3d37.svg'
                  />
               )}
            </FourthColumn>
            <FifthColumn>
               {codingProblem.isSolutionApproachCompleted ? (
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/49c9fd24-f8a3-469b-a258-b6e4738c1ad1.svg'
                  />
               ) : (
                  <Icon
                     alt='Cross'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/97ce671d-ae65-46aa-b30b-b31aa41e3d37.svg'
                  />
               )}
            </FifthColumn>
            <SixthColumn>
               {codingProblem.isCleanSolutionCompleted ? (
                  <Icon
                     alt='Tick'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/49c9fd24-f8a3-469b-a258-b6e4738c1ad1.svg'
                  />
               ) : (
                  <Icon
                     alt='Cross'
                     src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/97ce671d-ae65-46aa-b30b-b31aa41e3d37.svg'
                  />
               )}
            </SixthColumn>
         </CodingQuestionItem>
      )
   }
}

const CodingProblemItemWithRouter = withRouter(CodingProblemItem)

export { CodingProblemItemWithRouter }
