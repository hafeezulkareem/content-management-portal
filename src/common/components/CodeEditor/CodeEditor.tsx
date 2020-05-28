import React from 'react'
import { observer } from 'mobx-react'

import { CodeEditorHeader } from '../CodeEditorHeader'
import { ContentEditor } from '../ContentEditor'

import { CodeEditorContainer } from './styledComponents'

type CodeEditorProps = {
   code: string
   programmingLanguage: string
   onChangeFileName: any
   fileName: string
   codeEditorId: string
   onChangeProgrammingLanguage: any
   onChangeContent: any
   onClickDeleteButton: any
}

@observer
class CodeEditor extends React.Component<CodeEditorProps> {
   onChangeContent = updatedContent => {
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
         onClickDeleteButton
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
