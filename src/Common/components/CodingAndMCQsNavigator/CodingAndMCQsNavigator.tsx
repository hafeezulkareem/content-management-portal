import React from 'react'

import i18n from '../../i18n/strings.json'
import { MCQS_LIST, CODING_LIST } from '../../constants/SectionConstants'

import {
   NavigatorContainer,
   ButtonsContainer,
   MCQsButton,
   CodingProblemsButton
} from './styledComponents'

interface CodingAndMCQsNavigatorProps {
   activeSection: string
   onClickMCQsButton: () => void
   onClickCodingButton: () => void
}

class CodingAndMCQsNavigator extends React.Component<
   CodingAndMCQsNavigatorProps
> {
   render() {
      const { navigator } = i18n
      const {
         activeSection,
         onClickMCQsButton,
         onClickCodingButton
      } = this.props
      return (
         <NavigatorContainer>
            <ButtonsContainer>
               <MCQsButton
                  isActive={activeSection === MCQS_LIST}
                  onClick={onClickMCQsButton}
               >
                  {navigator.mcqsList}
               </MCQsButton>
               <CodingProblemsButton
                  isActive={activeSection === CODING_LIST}
                  onClick={onClickCodingButton}
               >
                  {navigator.codingQuestionsList}
               </CodingProblemsButton>
            </ButtonsContainer>
         </NavigatorContainer>
      )
   }
}

export { CodingAndMCQsNavigator }
