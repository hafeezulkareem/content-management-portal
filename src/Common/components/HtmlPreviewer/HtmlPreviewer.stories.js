import React from 'react'

import { HtmlPreviewer } from './HtmlPreviewer'

export default {
   title: 'common/HtmlPreviewer'
}

const htmlText = '<h1>This is H1</h1><h2>This is H2</h2>'

export const htmlPreviewer = () => <HtmlPreviewer htmlText={htmlText} />
