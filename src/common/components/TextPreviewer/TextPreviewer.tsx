import React from 'react'
import { observer } from 'mobx-react'

import { TextPreviewerContainer, PreTag } from './styledComponents'

type TextPreviewerProps = {
   text: string
}

@observer
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
