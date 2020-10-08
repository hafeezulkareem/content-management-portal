import React from 'react'

import { ContentEditor } from './ContentEditor'

export default {
   title: 'common/CodeContentEditor'
}

export const codeEditorDefaultView = () => (
   <ContentEditor contentType='javascript' />
)
