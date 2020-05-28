import React from 'react'

import { CodeEditor } from '../../../common/components/CodeEditor'

import { ComponentContainer, CodeEditorsContainer } from './styledComponents'

type RoughSolutionProps = {
   code: string
   programmingLanguage: string
}

// TODO: onChangeProgrammingLanguage and onClickAddButton methods as props
class CodeEditors extends React.Component<RoughSolutionProps> {
   render() {
      const { code, programmingLanguage } = this.props
      return (
         <ComponentContainer>
            <CodeEditorsContainer>
               <CodeEditor
                  programmingLanguage={programmingLanguage}
                  code={code}
               />
            </CodeEditorsContainer>
         </ComponentContainer>
      )
   }
}

export { CodeEditors }
