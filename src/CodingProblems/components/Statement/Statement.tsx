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
   LeftAndRightSections,
   ErrorMessage
} from './styledComponents'

type StatementProps = {
   codingProblemsStore: any
   onSelectTab: any
   currentTabIndex: number
   updateDataStatus: any
}

@observer
class Statement extends React.Component<StatementProps> {
   @observable shortText: string = ''
   @observable text: string = ''
   @observable
   textType: string = commonI18n.textEditorTypes[0].optionText.toLowerCase()
   @observable shortTextError: string | null = null
   @observable descriptionError: string | null = null

   init = () => {
      this.shortText = ''
      this.text = ''
      this.textType = commonI18n.textEditorTypes[0].optionText.toLowerCase()
   }

   onChangeShortText = event => {
      this.shortTextError = null
      this.shortText = event.target.value
      this.props.updateDataStatus(this.shortText)
   }

   onChangeDescription = updatedValue => {
      this.descriptionError = null
      this.text = updatedValue
      this.props.updateDataStatus(this.text)
   }

   onChangeTextType = event => {
      this.textType = event.target.value
      this.props.updateDataStatus(this.textType)
   }

   onClickSaveButton = event => {
      const { codingProblemsStore } = this.props
      const { postProblemStatement } = codingProblemsStore
      let statementData
      if (this.shortText && this.text) {
         statementData = {
            question_id: null,
            short_text: this.shortText,
            problem_description: {
               content: this.text,
               content_type: this.textType.toUpperCase()
            }
         }
         postProblemStatement(statementData)
         this.init()
         const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
         updateDataStatus(false)
         onSelectTab(currentTabIndex + 1)
      } else {
         const { statement } = i18n
         const { errors } = statement
         if (!this.shortText) {
            this.shortTextError = errors.shortTextIsRequired
         } else {
            this.descriptionError = errors.descriptionIsRequired
         }
      }
   }

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
                     {this.shortTextError && (
                        <ErrorMessage>{this.shortTextError}</ErrorMessage>
                     )}
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
                     {this.descriptionError && (
                        <ErrorMessage>{this.descriptionError}</ErrorMessage>
                     )}
                  </LeftSectionContainer>
               </StatementLeftSection>
               <StatementRightSection>
                  {this.renderPreviewer()}
               </StatementRightSection>
            </LeftAndRightSections>
            <SaveButtonContainer>
               <SaveButton onClickSaveButton={this.onClickSaveButton} />
            </SaveButtonContainer>
         </StatementContainer>
      )
   }
}

export { Statement }
