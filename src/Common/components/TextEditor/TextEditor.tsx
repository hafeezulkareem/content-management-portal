import React, { ChangeEvent } from 'react'

import { TextEditorHeader } from '../TextEditorHeader'
import { ContentEditor } from '../ContentEditor'

import { TextEditorContainer } from './styledComponents'

interface TextEditorProps {
   text: string
   textType: string
   onChangeDescription: (content: string) => void
   onChangeTextType: (event: ChangeEvent<HTMLSelectElement>) => void
}

class TextEditor extends React.Component<TextEditorProps> {
   render() {
      const {
         text,
         textType,
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
         </TextEditorContainer>
      )
   }
}

export { TextEditor }
