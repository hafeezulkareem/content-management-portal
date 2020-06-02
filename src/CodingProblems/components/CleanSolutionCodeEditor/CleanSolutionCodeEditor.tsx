import React from 'react'
import { observer } from 'mobx-react'

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
   uniqueId: string
   fileName: string
   onChangeFileName: any
   language: string
   onChangeLanguage: any
   solutionContent: string
   onChangeSolutionContent: any
   onClickDeleteButton: any
}

@observer
class CleanSolutionCodeEditor extends React.Component<
   CleanSolutionCodeEditorProps
> {
   onChangeSolutionContent = updatedContent => {
      const { uniqueId, onChangeSolutionContent } = this.props
      onChangeSolutionContent(updatedContent, uniqueId)
   }

   render() {
      const {
         uniqueId,
         fileName,
         onChangeFileName,
         language,
         onChangeLanguage,
         solutionContent,
         onClickDeleteButton
      } = this.props
      return (
         <CodeEditorContainer>
            <HeaderContainer>
               <FileNameInputField
                  fileName={fileName}
                  onChangeFileName={event => onChangeFileName(event, uniqueId)}
               />
               <DeleteIcon
                  onClick={() => onClickDeleteButton(uniqueId)}
                  alt='Delete Icon'
                  src={images.delete}
               />
            </HeaderContainer>
            <EditorContainer>
               <ContentEditor
                  contentType={language}
                  content={solutionContent}
                  onChangeContent={this.onChangeSolutionContent}
               />
            </EditorContainer>
            <DropDownContainer>
               <DropDown
                  defaultOption='Languages'
                  options={commonI18n.codeEditorLanguageOptions}
                  onChangeType={event => onChangeLanguage(event, uniqueId)}
                  selectedOption={language}
               />
            </DropDownContainer>
         </CodeEditorContainer>
      )
   }
}

export { CleanSolutionCodeEditor }
