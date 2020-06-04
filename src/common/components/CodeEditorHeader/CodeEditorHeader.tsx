import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'
import { DELETE_ICON_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'

import { DropDown } from '../DropDown'
import { FileNameInputField } from '../FileNameInputField'

import {
   HeaderContainer,
   HeaderRightSection,
   HeaderLeftSection,
   DeleteIcon
} from './styledComponents'

type CodeEditorHeaderProps = {
   onChangeFileName: any
   fileName: string
   codeEditorId: string
   onChangeProgrammingLanguage: any
   programmingLanguage: string
   onClickDeleteButton: any
   roughSolutionId: any
}

@observer
class CodeEditorHeader extends React.Component<CodeEditorHeaderProps> {
   onChangeFileName = event => {
      const { onChangeFileName, codeEditorId } = this.props
      onChangeFileName(event.target.value, codeEditorId)
   }

   onChangeProgrammingLanguage = event => {
      const { onChangeProgrammingLanguage, codeEditorId } = this.props
      onChangeProgrammingLanguage(event.target.value, codeEditorId)
   }

   onClickDeleteButton = event => {
      const { onClickDeleteButton, codeEditorId, roughSolutionId } = this.props
      onClickDeleteButton(codeEditorId, roughSolutionId)
   }

   render() {
      const { codeEditorLanguageOptions, imageAlts, languages } = i18n
      const { fileName, programmingLanguage } = this.props
      return (
         <HeaderContainer>
            <HeaderLeftSection>
               <FileNameInputField
                  onChangeFileName={this.onChangeFileName}
                  fileName={fileName}
               />
            </HeaderLeftSection>
            <HeaderRightSection>
               <DropDown
                  options={codeEditorLanguageOptions}
                  defaultOption={languages}
                  onChangeType={this.onChangeProgrammingLanguage}
                  selectedOption={programmingLanguage}
               />
               <DeleteIcon
                  data-testid={DELETE_ICON_TEST_ID}
                  onClick={this.onClickDeleteButton}
                  alt={imageAlts.deleteIcon}
                  src={images.delete}
               />
            </HeaderRightSection>
         </HeaderContainer>
      )
   }
}

export { CodeEditorHeader }
