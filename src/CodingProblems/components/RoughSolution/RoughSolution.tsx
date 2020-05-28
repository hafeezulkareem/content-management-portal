import React from 'react'

import { RoughSolutionContainer } from './styledComponents'
import { CodeEditors } from '../CodeEditors'

type RoughSolutionProps = {
   code: string
   programmingLanguage: string
}

// TODO: onChangeProgrammingLanguage and onClickAddButton methods as props
class RoughSolution extends React.Component<RoughSolutionProps> {
   render() {
      const { code, programmingLanguage } = this.props
      return (
         <RoughSolutionContainer>
            <CodeEditors
               code={code}
               programmingLanguage={programmingLanguage}
            />
         </RoughSolutionContainer>
      )
   }
}

export { RoughSolution }
