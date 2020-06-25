import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { TextEditor } from '../../../Common/components/TextEditor'
import commonI18n from '../../../Common/i18n/strings.json'
import { TextPreviewer } from '../../../Common/components/TextPreviewer'
import { MarkdownPreviewer } from '../../../Common/components/MarkdownPreviewer'
import { HtmlPreviewer } from '../../../Common/components/HtmlPreviewer'
import { Button } from '../../../Common/components/Button'
import { OverlayLoader } from '../../../Common/components/OverlayLoader'
import colors from '../../../Common/themes/Colors'

import i18n from '../../i18n/strings.json'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { StatementModel } from '../../stores/models/StatementModel'

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

interface StatementProps {
   codingProblemsStore: CodingProblemsStore
   onSelectTab: (tabNumber: number) => void
   currentTabIndex: number
   updateDataStatus: (status: boolean) => void
   statementDetails: StatementModel | null
   showToastMessage: (
      message: string | null,
      type: boolean,
      time: number
   ) => void
}

@observer
class Statement extends React.Component<StatementProps> {
   @observable shortText!: string
   @observable text!: string
   @observable
   textType!: string
   @observable shortTextError!: string | null
   @observable descriptionError!: string | null
   previousShortText!: string
   previousText!: string
   previousTextType!: string

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.shortText = ''
      this.text = ''
      this.textType = commonI18n.textEditorTypes[0].optionText.toLowerCase()
      this.shortTextError = null
      this.descriptionError = null
   }

   setStatementData = (statementDetails: StatementModel) => {
      this.shortText = statementDetails.shortText
      this.text = statementDetails.content
      this.textType = statementDetails.contentType
   }

   componentDidMount() {
      const {
         statementDetails,
         codingProblemsStore: { postStatementAPIResponse }
      } = this.props
      if (postStatementAPIResponse !== null) {
         this.setStatementData(postStatementAPIResponse)
      } else if (statementDetails !== null) {
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

   onChangeShortText = (event: ChangeEvent<HTMLInputElement>) => {
      this.shortTextError = null
      this.shortText = event.target.value
      this.updateDataStatus()
   }

   onChangeDescription = (updatedValue: string) => {
      this.descriptionError = null
      this.text = updatedValue
      this.updateDataStatus()
   }

   onChangeTextType = (event: ChangeEvent<HTMLSelectElement>) => {
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
      const { postSuccessMessages } = i18n
      showToastMessage(postSuccessMessages.statement, false, 700)
      setTimeout(this.moveToNextTab, 900)
   }

   onFailurePostProblemStatement = () => {
      const { showToastMessage, codingProblemsStore } = this.props
      showToastMessage(codingProblemsStore.postStatementAPIError, true, 1500)
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
      postProblemStatement(
         statementData,
         this.onSuccessPostProblemStatement,
         this.onFailurePostProblemStatement
      )
   }

   onClickSaveButton = () => {
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
      const { commonComponents } = commonI18n
      const {
         codingProblemsStore: { postStatementAPIStatus }
      } = this.props
      return (
         <StatementContainer>
            {postStatementAPIStatus === API_FETCHING ? <OverlayLoader /> : null}
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
               <Button
                  onClickButton={this.onClickSaveButton}
                  backgroundColor={colors.brightBlue}
                  textColor={colors.white}
                  buttonText={commonComponents.save}
               />
            </SaveButtonContainer>
         </StatementContainer>
      )
   }
}

export { Statement }
