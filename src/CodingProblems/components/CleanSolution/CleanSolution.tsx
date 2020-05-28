import React from 'react'

import { CleanSolutionCodeEditor } from '../CleanSolutionCodeEditor/CleanSolutionCodeEditor'
import { AddAndSaveButtons } from '../AddAndSaveButtons'

import { CleanSolutionContainer } from './styledComponents'

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
            <AddAndSaveButtons />
         </CleanSolutionContainer>
      )
   }
}

export { CleanSolution }
