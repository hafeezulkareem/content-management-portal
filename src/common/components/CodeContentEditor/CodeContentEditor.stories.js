import React from 'react'

import { CodeContentEditor } from './CodeContentEditor'

export default {
   title: 'common/CodeContentEditor'
}

export const codeEditorDefaultView = () => (
   <CodeContentEditor
      programmingLanguageDetails={{
         name: 'javascript',
         defaultCode: 'console.log("Hello, World!");'
      }}
   />
)
