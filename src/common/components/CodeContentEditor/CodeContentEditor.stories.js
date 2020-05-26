import React from 'react'

import { CodeContentEditor } from './CodeContentEditor'

export default {
   title: 'common/CodeContentEditor'
}

export const codeEditorDefaultView = () => (
   <CodeContentEditor programmingLanguage='javascript' />
)
