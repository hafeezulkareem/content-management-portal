import React from 'react'

import { FileNameInputField } from '../../../common/components/FileNameInputField'
import { ContentEditor } from '../../../common/components/ContentEditor'
import { DropDown } from '../../../common/components/DropDown'
import commonI18n from '../../../common/i18n/strings.json'

import {
   CodeEditorContainer,
   HeaderContainer,
   DeleteIcon,
   EditorContainer,
   DropDownContainer
} from './styledComponents'

type CleanSolutionCodeEditorProps = {
   content: string
   contentType: string
}

class CleanSolutionCodeEditor extends React.Component<
   CleanSolutionCodeEditorProps
> {
   render() {
      const { content, contentType } = this.props
      return (
         <CodeEditorContainer>
            <HeaderContainer>
               <FileNameInputField fileName='' onChangeFileName={() => {}} />
               <DeleteIcon
                  alt='Delete Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9e4cde90-c30c-4e52-8af4-e8f699efa24b.svg'
               />
            </HeaderContainer>
            <EditorContainer>
               <ContentEditor
                  contentType={contentType}
                  content={content}
                  onChangeContent={() => {}}
               />
            </EditorContainer>
            <DropDownContainer>
               <DropDown
                  defaultOption='languages'
                  options={commonI18n.codeEditorLanguageOptions}
                  onChangeType={() => {}}
                  selectedOption=''
               />
            </DropDownContainer>
         </CodeEditorContainer>
      )
   }
}

export { CleanSolutionCodeEditor }
