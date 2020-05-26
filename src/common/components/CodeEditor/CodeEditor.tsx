import React from 'react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { CodeContentEditor } from '../CodeContentEditor'

import { CodeEditorContainer } from './styledComponents'

type CodeEditorProps = {
   programmingLanguageDetails: {
      name: string
      id: string
      defaultCode: string
   }
}

class CodeEditor extends React.Component<CodeEditorProps> {
   render() {
      const { programmingLanguageDetails } = this.props
      return (
         <CodeEditorContainer>
            <CodeEditorHeader />
            <CodeContentEditor
               programmingLanguageDetails={programmingLanguageDetails}
            />
         </CodeEditorContainer>
      )
   }
}

export { CodeEditor }
