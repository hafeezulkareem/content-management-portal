import React from 'react'

import i18n from '../../i18n/strings.json'

import { FileNameInputField } from '../FileNameInputField'
import { DropDown } from '../DropDown'

import {
   HeaderContainer,
   HeaderRightSection,
   HeaderLeftSection,
   DeleteIcon,
   EditIcon
} from './styledComponents'

class CodeEditorHeader extends React.Component {
   render() {
      const { codeEditorLanguageOptions } = i18n
      return (
         <HeaderContainer>
            <HeaderLeftSection>
               <FileNameInputField />
            </HeaderLeftSection>
            <HeaderRightSection>
               <DropDown options={codeEditorLanguageOptions} />
               <DeleteIcon
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
