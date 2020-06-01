import React from 'react'

import { TestCasesAndHintsNavigation } from '../TestCasesAndHintsNavigation'

import { TestCasesContainer, ButtonsContainer } from './styledComponents'
import { TestCasesContentSection } from '../TestCasesContentSection'

type TestCasesProps = {
   content: string
}

class TestCases extends React.Component<TestCasesProps> {
   render() {
      const { content } = this.props
      return (
         <TestCasesContainer>
            <ButtonsContainer>
               <TestCasesAndHintsNavigation />
            </ButtonsContainer>
            <TestCasesContentSection content={content} />
         </TestCasesContainer>
      )
   }
}

export { TestCases }
