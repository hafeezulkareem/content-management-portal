import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'
import { DELETE_ICON_TEST_ID } from '../../constants/IdConstants'

import { DropDown } from '../DropDown'
import { FileNameInputField } from '../FileNameInputField'

import {
   HeaderContainer,
   HeaderRightSection,
   HeaderLeftSection,
   DeleteIcon,
   EditIcon
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
      const { codeEditorLanguageOptions } = i18n
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
                  defaultOption='languages'
                  onChangeType={this.onChangeProgrammingLanguage}
                  selectedOption={programmingLanguage}
               />
               <DeleteIcon
                  data-testid={DELETE_ICON_TEST_ID}
                  onClick={this.onClickDeleteButton}
                  alt='Delete Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/481da5e6-de1f-436e-a6c3-e30e28d220a3.svg'
               />
               <EditIcon
                  alt='Edit Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/84eb5be8-75cf-4c8f-8bd7-1162229b42f6.svg'
               />
            </HeaderRightSection>
         </HeaderContainer>
      )
   }
}

export { CodeEditorHeader }
