import React from 'react'
import { observer } from 'mobx-react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { ContentEditor } from '../ContentEditor'

import { CodeEditorContainer } from './styledComponents'

interface CodeEditorProps {
   code: string
   programmingLanguage: string
   onChangeFileName: (fileName: string, id: string) => void
   fileName: string
   codeEditorId: string
   onChangeProgrammingLanguage: (
      programmingLanguage: string,
      id: string
   ) => void
   onChangeContent: (content: string, id: string) => void
   onClickDeleteButton: (editorId: string, roughSolutionId: number) => void
   roughSolutionId: string
}

@observer
class CodeEditor extends React.Component<CodeEditorProps> {
   onChangeContent = (updatedContent: string) => {
      const { onChangeContent, codeEditorId } = this.props
      onChangeContent(updatedContent, codeEditorId)
   }

   render() {
      const {
         code,
         programmingLanguage,
         onChangeFileName,
         fileName,
         codeEditorId,
         onChangeProgrammingLanguage,
         onClickDeleteButton,
         roughSolutionId
      } = this.props
      return (
         <CodeEditorContainer>
            <CodeEditorHeader
               onChangeFileName={onChangeFileName}
               fileName={fileName}
               codeEditorId={codeEditorId}
               onChangeProgrammingLanguage={onChangeProgrammingLanguage}
               programmingLanguage={programmingLanguage}
               onClickDeleteButton={onClickDeleteButton}
               roughSolutionId={roughSolutionId}
            />
            <ContentEditor
               content={code}
               contentType={programmingLanguage}
               onChangeContent={this.onChangeContent}
            />
         </CodeEditorContainer>
      )
   }
}

export { CodeEditor }
