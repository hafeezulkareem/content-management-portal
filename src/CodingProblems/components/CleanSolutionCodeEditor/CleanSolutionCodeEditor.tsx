import React from 'react'

import { FileNameInputField } from '../../../Common/components/FileNameInputField'
import { ContentEditor } from '../../../Common/components/ContentEditor'
import { DropDown } from '../../../Common/components/DropDown'
import commonI18n from '../../../Common/i18n/strings.json'
import images from '../../../Common/themes/Images'

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
               <DeleteIcon alt='Delete Icon' src={images.delete} />
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
                  defaultOption='Languages'
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
