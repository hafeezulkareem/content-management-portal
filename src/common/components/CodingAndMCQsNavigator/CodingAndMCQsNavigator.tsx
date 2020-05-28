import React from 'react'

import i18n from '../../i18n/strings.json'
import { MCQS_LIST, CODING_LIST } from '../../constants/SectionConstants'

import {
   NavigatorContainer,
   ButtonsContainer,
   MCQsButton,
   CodingProblemsButton
} from './styledComponents'

type CodingAndMCQsNavigatorProps = {
   activeSection: string
}

class CodingAndMCQsNavigator extends React.Component<
   CodingAndMCQsNavigatorProps
> {
   render() {
      const { navigator } = i18n
      const { activeSection } = this.props
      return (
         <NavigatorContainer>
            <ButtonsContainer>
               <MCQsButton isActive={activeSection === MCQS_LIST}>
                  {navigator.mcqsList}
               </MCQsButton>
               <CodingProblemsButton isActive={activeSection === CODING_LIST}>
                  {navigator.codingQuestionsList}
               </CodingProblemsButton>
            </ButtonsContainer>
         </NavigatorContainer>
      )
   }
}

export { CodingAndMCQsNavigator }
