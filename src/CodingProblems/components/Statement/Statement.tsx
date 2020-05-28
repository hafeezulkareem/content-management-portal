import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

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
@observer
class Statement extends React.Component {
   @observable shortText: string = ''
   @observable text: string = ''
   @observable
   textType: string = commonI18n.textEditorTypes[0].optionText.toLowerCase()

   renderPreviewer = () => {
      const { textEditorTypes } = commonI18n
      switch (this.textType.toLowerCase()) {
         case textEditorTypes[0].optionText.toLowerCase():
            return <TextPreviewer text={this.text} />
         case textEditorTypes[1].optionText.toLowerCase():
            return <HtmlPreviewer htmlText={this.text} />
         case textEditorTypes[2].optionText.toLowerCase():
            return <MarkdownPreviewer markdownText={this.text} />
      }
   }

   onChangeShortText = event => {
      this.shortText = event.target.value
   }

   onChangeDescription = updatedValue => {
      this.text = updatedValue
   }

   onChangeTextType = event => {
      this.textType = event.target.value
   }

   render() {
      const { statement } = i18n
      return (
         <StatementContainer>
            <LeftAndRightSections>
               <StatementLeftSection>
                  <LeftSectionContainer>
                     <TextLabel>{statement.shortText}</TextLabel>
                     <ShortTextInputField
                        onChange={this.onChangeShortText}
                        value={this.shortText}
                        type={this.textType}
                        placeholder={statement.shortTextPlaceHolder}
                     />
                  </LeftSectionContainer>
                  <LeftSectionContainer>
                     <TextLabel>{statement.problemDescription}</TextLabel>
                     <TextEditor
                        text={this.text}
                        textType={this.textType}
                        onChangeDescription={this.onChangeDescription}
                        onClickAttachFileButton={() => {}}
                        onChangeTextType={this.onChangeTextType}
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
