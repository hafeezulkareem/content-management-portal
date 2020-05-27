import React from 'react'

import { TextEditor } from '../../../common/components/TextEditor'
import commonI18n from '../../../common/i18n/strings.json'
import { TextPreviewer } from '../../../common/components/TextPreviewer'
import { MarkdownPreviewer } from '../../../common/components/MarkdownPreviewer'
import { HtmlPreviewer } from '../../../common/components/HtmlPreviewer'
import { SaveButton } from '../../../common/components/SaveButton'

import i18n from '../../i18n/strings.json'

import {
   StatementContainer,
   StatementLeftSection,
   StatementRightSection,
   TextLabel,
   ShortTextInputField,
   LeftSectionContainer,
   SaveButtonContainer,
   LeftAndRightSections
} from './styledComponents'

type StatementProps = {
   text: string
   textType: string
   onClickAttachFileButton: () => {}
}

class Statement extends React.Component<StatementProps> {
   renderPreviewer = () => {
      const { textType, text } = this.props
      const { textEditorTypes } = commonI18n
      switch (textType) {
         case textEditorTypes[0].optionText.toLowerCase():
            return <TextPreviewer text={text} />
         case textEditorTypes[1].optionText.toLowerCase():
            return <HtmlPreviewer htmlText={text} />
         case textEditorTypes[2].optionText.toLowerCase():
            return <MarkdownPreviewer markdownText={text} />
      }
   }

   render() {
      const { statement } = i18n
      const { textType, onClickAttachFileButton } = this.props
      return (
         <StatementContainer>
            <LeftAndRightSections>
               <StatementLeftSection>
                  <LeftSectionContainer>
                     <TextLabel>{statement.shortText}</TextLabel>
                     <ShortTextInputField
                        type={statement.shortTextType}
                        placeholder={statement.shortTextPlaceHolder}
                     />
                  </LeftSectionContainer>
                  <LeftSectionContainer>
                     <TextLabel>{statement.problemDescription}</TextLabel>
                     <TextEditor
                        textType={textType}
                        onClickAttachFileButton={onClickAttachFileButton}
                     />
                  </LeftSectionContainer>
               </StatementLeftSection>
               <StatementRightSection>
                  {this.renderPreviewer()}
               </StatementRightSection>
            </LeftAndRightSections>
            <SaveButtonContainer>
               <SaveButton onClickSaveButton={() => {}} />
            </SaveButtonContainer>
         </StatementContainer>
      )
   }
}

export { Statement }
