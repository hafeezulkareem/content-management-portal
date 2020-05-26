import React from 'react'

import { HtmlPreviewerContainer } from './styledComponents'

type HtmlPreviewerProps = {
   htmlText: string
}

class HtmlPreviewer extends React.Component<HtmlPreviewerProps> {
   render() {
      const { htmlText } = this.props
      return (
         <HtmlPreviewerContainer
            dangerouslySetInnerHTML={{
               __html: htmlText
            }}
         ></HtmlPreviewerContainer>
      )
   }
}

export { HtmlPreviewer }
