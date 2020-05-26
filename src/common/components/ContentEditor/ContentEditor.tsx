import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/mode-php'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-min-noconflict/mode-markdown'
import 'ace-builds/src-min-noconflict/mode-html'
import 'ace-builds/src-min-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-github'

import { ContentEditorContainer } from './styledComponents'

type ContentEditorProps = {
   contentType: string
}

class ContentEditor extends React.Component<ContentEditorProps> {
   render() {
      const { contentType } = this.props
      return (
         <ContentEditorContainer>
            <AceEditor
               style={{
                  width: 'inherit',
                  height: 'inherit'
               }}
               mode={contentType}
               fontSize={14}
               showPrintMargin={true}
               showGutter={true}
               highlightActiveLine={false}
               setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 3
               }}
            />
         </ContentEditorContainer>
      )
   }
}

export { ContentEditor }
