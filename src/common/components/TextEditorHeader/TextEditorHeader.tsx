import React from 'react'

import i18n from '../../i18n/strings.json'

import { DropDown } from '../DropDown'

import {
   HeaderContainer,
   HeaderSection,
   DeleteIcon,
   EditIcon
} from './styledComponents'

class TextEditorHeader extends React.Component {
   render() {
      const { textEditorTypes } = i18n as any
      return (
         <HeaderContainer>
            <HeaderSection>
               <DropDown options={textEditorTypes} defaultOption='' />
               <DeleteIcon
                  alt='Delete Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/f4c1be13-5be3-4d3a-aa49-80bd0f6a6973.svg'
               />
               <EditIcon
                  alt='Edit Icon'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/737c50fc-e3a5-4f4f-8665-f8e2ae85cced.svg'
               />
            </HeaderSection>
         </HeaderContainer>
      )
   }
}

export { TextEditorHeader }
