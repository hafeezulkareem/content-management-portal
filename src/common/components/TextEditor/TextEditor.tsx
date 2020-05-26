import React from 'react'

import { TextEditorContainer } from './styledComponents'
import { TextEditorHeader } from '../TextEditorHeader'
import { ContentEditor } from '../ContentEditor'
import { TextEditorFooter } from '../TextEditorFooter'

type TextEditorProps = {
   textType: string
   onClickAttachFileButton: () => void
}

class TextEditor extends React.Component<TextEditorProps> {
   render() {
      const { textType, onClickAttachFileButton } = this.props
      return (
         <TextEditorContainer>
            <TextEditorHeader />
            <ContentEditor contentType={textType} />
            <TextEditorFooter
               onClickAttachFileButton={onClickAttachFileButton}
            />
         </TextEditorContainer>
      )
   }
}

export { TextEditor }
