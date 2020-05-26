import React from 'react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { ContentEditor } from '../ContentEditor'

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
            <ContentEditor contentType={programmingLanguage} />
         </CodeEditorContainer>
      )
   }
}

export { CodeEditor }
