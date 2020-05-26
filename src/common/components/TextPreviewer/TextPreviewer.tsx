import React from 'react'

import { TextPreviewerContainer, PreTag } from './styledComponents'

type TextPreviewerProps = {
   text: string
}

class TextPreviewer extends React.Component<TextPreviewerProps> {
   render() {
      const { text } = this.props
      return (
         <TextPreviewerContainer>
            <PreTag>{text}</PreTag>
         </TextPreviewerContainer>
      )
   }
}

export { TextPreviewer }
