import React from 'react'

import { TextEditorHeader } from '../TextEditorHeader'
import { ContentEditor } from '../ContentEditor'
import { TextEditorFooter } from '../TextEditorFooter'

import { TextEditorContainer } from './styledComponents'

type TextEditorProps = {
   text: string
   textType: string
   onChangeDescription: any
   onClickAttachFileButton: () => void
   onChangeTextType: any
}

class TextEditor extends React.Component<TextEditorProps> {
   render() {
      const {
         text,
         textType,
         onClickAttachFileButton,
         onChangeDescription,
         onChangeTextType
      } = this.props
      return (
         <TextEditorContainer>
            <TextEditorHeader
               onChangeTextType={onChangeTextType}
               selectedOption={textType}
            />
            <ContentEditor
               contentType={textType}
               content={text}
               onChangeContent={onChangeDescription}
            />
            <TextEditorFooter
               onClickAttachFileButton={onClickAttachFileButton}
            />
         </TextEditorContainer>
      )
   }
}

export { TextEditor }
