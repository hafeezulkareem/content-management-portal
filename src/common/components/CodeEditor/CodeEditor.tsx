import React from 'react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { ContentEditor } from '../ContentEditor'

import { CodeEditorContainer } from './styledComponents'

type CodeEditorProps = {
   code: string
   programmingLanguage: string
}

class CodeEditor extends React.Component<CodeEditorProps> {
   render() {
      const { code, programmingLanguage } = this.props
      return (
         <CodeEditorContainer>
            <CodeEditorHeader />
            <ContentEditor
               content={code}
               contentType={programmingLanguage}
               onChangeContent={() => {}}
            />
         </CodeEditorContainer>
      )
   }
}

export { CodeEditor }
