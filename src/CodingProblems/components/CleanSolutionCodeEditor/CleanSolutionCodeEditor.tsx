import React, { ChangeEvent } from 'react'
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

interface CleanSolutionCodeEditorProps {
   uniqueId: string
   fileName: string
   onChangeFileName: (event: ChangeEvent<HTMLInputElement>, id: string) => void
   language: string
   onChangeLanguage: (event: ChangeEvent<HTMLSelectElement>, id: string) => void
   solutionContent: string
   onChangeSolutionContent: (content: string, id: string) => void
   onClickDeleteButton: (id: string) => void
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
      const { codeEditorLanguageOptions, imageAlts } = commonI18n
      return (
         <CodeEditorContainer>
            <HeaderContainer>
               <FileNameInputField
                  fileName={fileName}
                  onChangeFileName={event => onChangeFileName(event, uniqueId)}
               />
               <DeleteIcon
                  onClick={() => onClickDeleteButton(uniqueId)}
                  alt={imageAlts.deleteIcon}
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
                  options={codeEditorLanguageOptions}
                  onChangeType={event => onChangeLanguage(event, uniqueId)}
                  selectedOption={language}
               />
            </DropDownContainer>
         </CodeEditorContainer>
      )
   }
}

export { CleanSolutionCodeEditor }
