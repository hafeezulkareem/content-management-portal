import React from 'react'

import { MarkdownPreviewer } from './MarkdownPreviewer'

export default {
   title: 'common/MarkdownPreviewer'
}

const testingMarkdownText = '# This is a header\n\nAnd this is a paragraph'

export const markdownPreviewer = () => (
   <MarkdownPreviewer markdownText={testingMarkdownText} />
)
