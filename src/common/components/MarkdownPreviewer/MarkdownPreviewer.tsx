import React from 'react'
import ReactMarkdown from 'react-markdown'

import 'github-markdown-css'

import { PreviewerContainer } from './styledComponents'

type MarkdownPreviewerProps = {
   markdownText: string
}

class MarkdownPreviewer extends React.Component<MarkdownPreviewerProps> {
   render() {
      const { markdownText } = this.props
      return (
         <PreviewerContainer className='markdown-body'>
            <ReactMarkdown source={markdownText} />
         </PreviewerContainer>
      )
   }
}

export { MarkdownPreviewer }
