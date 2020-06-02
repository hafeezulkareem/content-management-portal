import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'
import images from '../../themes/Images'

import { DropDown } from '../DropDown'

import { HeaderContainer, HeaderSection, DeleteIcon } from './styledComponents'

type TextEditorHeaderProps = {
   onChangeTextType: any
   selectedOption: string
}

@observer
class TextEditorHeader extends React.Component<TextEditorHeaderProps> {
   render() {
      const { textEditorTypes } = i18n as any
      const { onChangeTextType, selectedOption } = this.props
      return (
         <HeaderContainer>
            <HeaderSection>
               <DropDown
                  options={textEditorTypes}
                  defaultOption=''
                  onChangeType={onChangeTextType}
                  selectedOption={selectedOption}
               />
               <DeleteIcon alt='Delete Icon' src={images.delete} />
            </HeaderSection>
         </HeaderContainer>
      )
   }
}

export { TextEditorHeader }
