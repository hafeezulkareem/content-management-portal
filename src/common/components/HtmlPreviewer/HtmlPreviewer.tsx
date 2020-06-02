import React from 'react'

import { HtmlPreviewerContainer, IFrame } from './styledComponents'

type HtmlPreviewerProps = {
   htmlText: string
}

class HtmlPreviewer extends React.Component<HtmlPreviewerProps> {
   render() {
      const { htmlText } = this.props
      return (
         <HtmlPreviewerContainer>
            <IFrame title='htmlPreviewer' srcDoc={htmlText}></IFrame>
         </HtmlPreviewerContainer>
      )
   }
}

export { HtmlPreviewer }
