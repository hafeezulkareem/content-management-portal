import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/mode-php'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/theme-github'

import { CodeEditorContainer } from './styledComponents'

type CodeEditorProps = {
   programmingLanguageDetails: {
      name: string
      defaultCode: string
   }
}

class CodeContentEditor extends React.Component<CodeEditorProps> {
   render() {
      const { programmingLanguageDetails } = this.props
      return (
         <CodeEditorContainer>
            <AceEditor
               style={{
                  width: 'inherit',
                  height: 'inherit'
               }}
               placeholder=''
               mode={programmingLanguageDetails.name}
               fontSize={14}
               showPrintMargin={true}
               showGutter={true}
               highlightActiveLine={false}
               value={programmingLanguageDetails.defaultCode}
               setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 3
               }}
            />
         </CodeEditorContainer>
      )
   }
}

export { CodeContentEditor }
