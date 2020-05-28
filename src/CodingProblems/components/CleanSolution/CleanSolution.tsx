import React from 'react'

import { AddButton } from '../../../common/components/AddButton'
import { SaveButton } from '../../../common/components/SaveButton'

import { CleanSolutionCodeEditor } from '../CleanSolutionCodeEditor/CleanSolutionCodeEditor'

import { CleanSolutionContainer, ButtonsContainer } from './styledComponents'

type CleanSolutionProps = {
   content: string
   contentType: string
}

class CleanSolution extends React.Component<CleanSolutionProps> {
   render() {
      const { content, contentType } = this.props
      return (
         <CleanSolutionContainer>
            <CleanSolutionCodeEditor
               contentType={contentType}
               content={content}
            />
            <ButtonsContainer>
               <AddButton onClickAddButton={() => {}} />
               <SaveButton onClickSaveButton={() => {}} />
            </ButtonsContainer>
         </CleanSolutionContainer>
      )
   }
}

export { CleanSolution }
