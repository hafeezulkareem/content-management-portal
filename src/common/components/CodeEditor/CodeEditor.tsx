import React from 'react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { CodeContentEditor } from '../CodeContentEditor'

import { CodeEditorContainer } from './styledComponents'

type CodeEditorProps = {
   programmingLanguage: string
}

class CodeEditor extends React.Component<CodeEditorProps> {
   render() {
      const { programmingLanguage } = this.props
      return (
         <CodeEditorContainer>
            <CodeEditorHeader />
            <CodeContentEditor programmingLanguage={programmingLanguage} />
         </CodeEditorContainer>
      )
   }
}

export { CodeEditor }
