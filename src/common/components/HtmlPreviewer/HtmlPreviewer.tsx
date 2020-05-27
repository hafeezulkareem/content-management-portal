import React from 'react'

import { HtmlPreviewerContainer } from './styledComponents'

type HtmlPreviewerProps = {
   htmlText: string
}

class HtmlPreviewer extends React.Component<HtmlPreviewerProps> {
   render() {
      const { htmlText } = this.props
      return (
         <HtmlPreviewerContainer>
            <iframe title='htmlPreviewer' srcDoc={htmlText}></iframe>
         </HtmlPreviewerContainer>
      )
   }
}

export { HtmlPreviewer }
