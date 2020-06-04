import React from 'react'
import { observer } from 'mobx-react'
import { observable, toJS } from 'mobx'

import { TextEditor } from '../../../Common/components/TextEditor'
import commonI18n from '../../../Common/i18n/strings.json'
import { TextPreviewer } from '../../../Common/components/TextPreviewer'
import { MarkdownPreviewer } from '../../../Common/components/MarkdownPreviewer'
import { HtmlPreviewer } from '../../../Common/components/HtmlPreviewer'
import { SaveButton } from '../../../Common/components/SaveButton'

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
   statementDetails: any
   showToastMessage: any
}

@observer
class Statement extends React.Component<StatementProps> {
   @observable shortText: string = ''
   @observable text: string = ''
   @observable
   textType: string = commonI18n.textEditorTypes[0].optionText.toLowerCase()
   @observable shortTextError: string | null = null
   @observable descriptionError: string | null = null
   previousShortText
   previousText
   previousTextType

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.shortText = ''
      this.text = ''
      this.textType = commonI18n.textEditorTypes[0].optionText.toLowerCase()
   }

   setStatementData = statementDetails => {
      this.shortText = statementDetails.shortText
      this.text = statementDetails.content
      this.textType = statementDetails.contentType
   }

   componentDidMount() {
      const {
         statementDetails,
         codingProblemsStore: { postStatementAPIResponse }
      } = this.props
      if (postStatementAPIResponse) {
         this.setStatementData(postStatementAPIResponse)
      } else if (statementDetails) {
         this.setStatementData(statementDetails)
      }
      this.previousShortText = this.shortText
      this.previousText = this.text
      this.previousTextType = this.textType
   }

   updateDataStatus = () => {
      const { updateDataStatus } = this.props
      if (
         this.previousShortText !== this.shortText ||
         this.previousText !== this.text ||
         this.previousTextType.toLowerCase() !== this.textType.toLowerCase()
      ) {
         updateDataStatus(false)
      } else {
         updateDataStatus(true)
      }
   }

   onChangeShortText = event => {
      this.shortTextError = null
      this.shortText = event.target.value
      this.updateDataStatus()
   }

   onChangeDescription = updatedValue => {
      this.descriptionError = null
      this.text = updatedValue
      this.updateDataStatus()
   }

   onChangeTextType = event => {
      this.textType = event.target.value
      this.updateDataStatus()
   }

   moveToNextTab = () => {
      const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
      this.init()
      updateDataStatus(true)
      onSelectTab(currentTabIndex + 1)
   }

   onSuccessPostProblemStatement = () => {
      const { showToastMessage } = this.props
      const { postSuccessMessages } = i18n as any
      showToastMessage(
         postSuccessMessages.statement,
         false,
         500,
         this.moveToNextTab
      )
   }

   onFailurePostProblemStatement = () => {
      const { showToastMessage, codingProblemsStore } = this.props
      showToastMessage(
         codingProblemsStore.postStatementAPIError,
         true,
         1500,
         () => {}
      )
   }

   postProblemStatement = () => {
      const {
         codingProblemsStore: { codingProblemId, postProblemStatement }
      } = this.props
      const statementData = {
         question_id: codingProblemId,
         short_text: this.shortText,
         problem_description: {
            content: this.text,
            content_type: this.textType.toUpperCase()
         }
      }
      console.log('Statement Data:- ', toJS(statementData))
      postProblemStatement(
         statementData,
         this.onSuccessPostProblemStatement,
         this.onFailurePostProblemStatement
      )
   }

   onClickSaveButton = event => {
      if (this.shortText && this.text) {
         this.postProblemStatement()
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
