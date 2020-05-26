import React from 'react'

import i18n from '../../i18n/strings.json'

import {
   FooterContainer,
   AttachFileButton,
   AttachFileIcon
} from './styledComponents'

type TextEditorFooterProps = {
   onClickAttachFileButton: () => void
}

class TextEditorFooter extends React.Component<TextEditorFooterProps> {
   render() {
      const { commonComponents } = i18n as any
      const { onClickAttachFileButton } = this.props
      return (
         <FooterContainer>
            <AttachFileButton onClick={onClickAttachFileButton}>
               <AttachFileIcon />
               {commonComponents.addFiles}
            </AttachFileButton>
         </FooterContainer>
      )
   }
}

export { TextEditorFooter }
