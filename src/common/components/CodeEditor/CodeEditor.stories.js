import React from 'react'

import { CodeEditor } from './CodeEditor'

export default {
   title: 'common/CodeEditor'
}

export const codeEditor = () => (
   <CodeEditor
      programmingLanguageDetails={{
         name: 'javascript',
         defaultCode: 'console.log("Hello, World!");'
      }}
   />
)
