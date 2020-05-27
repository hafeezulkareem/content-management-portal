import React from 'react'

import { AddButton } from '../../../common/components/AddButton'
import { SaveButton } from '../../../common/components/SaveButton'

import { CleanSolutionCodeEditor } from '../CleanSolutionCodeEditor/CleanSolutionCodeEditor'

import { CleanSolutionContainer, ButtonsContainer } from './styledComponents'

type CleanSolutionProps = {
   contentType: string
}

class CleanSolution extends React.Component<CleanSolutionProps> {
   render() {
      const { contentType } = this.props
      return (
         <CleanSolutionContainer>
            <CleanSolutionCodeEditor contentType={contentType} />
            <ButtonsContainer>
               <AddButton onClickAddButton={() => {}} />
               <SaveButton onClickSaveButton={() => {}} />
            </ButtonsContainer>
         </CleanSolutionContainer>
      )
   }
}

export { CleanSolution }
