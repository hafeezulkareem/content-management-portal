import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { API_FETCHING } from '@ib/api-constants'

import commonI18n from '../../../Common/i18n/strings.json'
import { TextEditorHeader } from '../../../Common/components/TextEditorHeader'
import { ContentEditor } from '../../../Common/components/ContentEditor'
import { TextPreviewer } from '../../../Common/components/TextPreviewer'
import { HtmlPreviewer } from '../../../Common/components/HtmlPreviewer'
import { MarkdownPreviewer } from '../../../Common/components/MarkdownPreviewer'
import { Button } from '../../../Common/components/Button'
import { OverlayLoader } from '../../../Common/components/OverlayLoader'
import colors from '../../../Common/themes/Colors'

import i18n from '../../i18n/strings.json'

import {
   SolutionApproachLeftSection,
   SolutionApproachContainer,
   SolutionApproachRightSection,
   TextLabel,
   TextEditorContainer,
   TitleInputField,
   SaveButtonContainer,
   LeftAndRightSections,
   ErrorMessage
} from './styledComponents'

type SolutionApproachProps = {
   codingProblemsStore: any
   solutionApproach: any
   onSelectTab: any
   currentTabIndex: number
   showToastMessage: any
   updateDataStatus: any
}

@observer
class SolutionApproach extends React.Component<SolutionApproachProps> {
   @observable title!: string
   @observable titleErrorMessage!: string | null
   @observable description!: { type: string; content: string }
   @observable descriptionErrorMessage!: string | null
   @observable complexityAnalysis!: { type: string; content: string }
   @observable complexityAnalysisErrorMessage!: string | null
   @observable writingField!: string
   solutionApproachId!: number | null
   previousSolutionApproachData: any

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.title = ''
      this.description = {
         type: 'Text',
         content: ''
      }
      this.complexityAnalysis = {
         type: 'Text',
         content: ''
      }
      this.writingField = i18n.solutionApproach.description
      this.solutionApproachId = null
      this.initErrors()
   }

   initErrors = () => {
      this.titleErrorMessage = null
      this.descriptionErrorMessage = null
      this.complexityAnalysisErrorMessage = null
   }

   setSolutionApproachData(solutionApproach) {
      this.title = solutionApproach.title
      this.description = { ...solutionApproach.description }
      this.complexityAnalysis = { ...solutionApproach.complexityAnalysis }
      this.solutionApproachId = solutionApproach.solutionApproachId
   }

   componentDidMount() {
      const {
         solutionApproach,
         codingProblemsStore: { postSolutionApproachAPIResponse }
      } = this.props
      if (postSolutionApproachAPIResponse !== null) {
         this.setSolutionApproachData(postSolutionApproachAPIResponse)
      } else if (solutionApproach !== null) {
         this.setSolutionApproachData(solutionApproach)
      }
      this.previousSolutionApproachData = {
         title: this.title,
         description: { ...this.description },
         complexityAnalysis: { ...this.complexityAnalysis }
      }
   }

   updateDataStatus = () => {
      const { updateDataStatus } = this.props
      if (
         this.title !== this.previousSolutionApproachData.title ||
         this.description.content !==
            this.previousSolutionApproachData.description.content ||
         this.description.type !==
            this.previousSolutionApproachData.description.type ||
         this.complexityAnalysis.content !==
            this.previousSolutionApproachData.complexityAnalysis.content ||
         this.complexityAnalysis.type !==
            this.previousSolutionApproachData.complexityAnalysis.type
      ) {
         updateDataStatus(false)
      } else {
         updateDataStatus(true)
      }
   }

   renderPreviewer = () => {
      const { textEditorTypes } = commonI18n
      const { solutionApproach } = i18n
      const contentType =
         this.writingField === solutionApproach.description
            ? this.description.type.toLowerCase()
            : this.complexityAnalysis.type.toLowerCase()
      const content =
         this.writingField === solutionApproach.description
            ? this.description.content
            : this.complexityAnalysis.content
      switch (contentType) {
         case textEditorTypes[0].optionText.toLowerCase():
            return <TextPreviewer text={content} />
         case textEditorTypes[1].optionText.toLowerCase():
            return <HtmlPreviewer htmlText={content} />
         case textEditorTypes[2].optionText.toLowerCase():
            return <MarkdownPreviewer markdownText={content} />
      }
   }

   onChangeTitle = event => {
      this.title = event.target.value
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeDescriptionType = event => {
      this.description.type = event.target.value
      this.updateDataStatus()
   }

   onChangeDescriptionContent = updatedContent => {
      this.writingField = i18n.solutionApproach.description
      this.description.content = updatedContent
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeComplexityAnalysisType = event => {
      this.complexityAnalysis.type = event.target.value
      this.updateDataStatus()
   }

   onChangeComplexityAnalysisContent = updatedContent => {
      this.writingField = i18n.solutionApproach.complexityAnalysis
      this.complexityAnalysis.content = updatedContent
      this.initErrors()
      this.updateDataStatus()
   }

   areAllFieldsFilled = () => {
      const {
         solutionApproach: { errors }
      } = i18n
      if (!this.title.trim()) {
         this.titleErrorMessage = errors.titleError
         return false
      } else if (!this.description.content.trim()) {
         this.descriptionErrorMessage = errors.descriptionError
         return false
      } else if (!this.complexityAnalysis.content.trim()) {
         this.complexityAnalysisErrorMessage = errors.complexityAnalysisError
         return false
      }
      this.initErrors()
      return true
   }

   moveToNextTab = () => {
      this.init()
      const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
      updateDataStatus(true)
      onSelectTab(currentTabIndex + 1)
   }

   onSuccessPostSolutionApproach = () => {
      const { showToastMessage } = this.props
      const { postSuccessMessages } = i18n
      showToastMessage(
         postSuccessMessages.solutionApproach,
         false,
         700,
         () => {}
      )
      setTimeout(this.moveToNextTab, 800)
   }

   onFailurePostSolutionApproach = () => {
      const {
         codingProblemsStore: { postSolutionApproachAPIError },
         showToastMessage
      } = this.props
      showToastMessage(postSolutionApproachAPIError, true, 1500, () => {})
   }

   postSolutionApproach = solutionApproachData => {
      const {
         codingProblemsStore: { postProblemSolutionApproach }
      } = this.props
      postProblemSolutionApproach(
         solutionApproachData,
         this.onSuccessPostSolutionApproach,
         this.onFailurePostSolutionApproach
      )
   }

   onClickSaveButton = () => {
      const {
         codingProblemsStore: { codingProblemId },
         showToastMessage
      } = this.props
      if (codingProblemId !== null) {
         if (this.areAllFieldsFilled()) {
            const solutionApproachData = {
               solution_approach_id: this.solutionApproachId,
               title: this.title,
               description: {
                  content_type: this.description.type.toUpperCase(),
                  content: this.description.content
               },
               complexity_analysis: {
                  content_type: this.complexityAnalysis.type.toUpperCase(),
                  content: this.complexityAnalysis.content
               }
            }
            this.postSolutionApproach(solutionApproachData)
         }
      } else {
         const { updateDataStatus } = this.props
         updateDataStatus(true)
         const { firstCreateTheStatement } = i18n
         showToastMessage(firstCreateTheStatement, true, 1500, () => {})
      }
   }

   render() {
      const { solutionApproach } = i18n as any
      const { commonComponents } = commonI18n
      const {
         codingProblemsStore: { postSolutionApproachAPIStatus }
      } = this.props
      return (
         <SolutionApproachContainer>
            {postSolutionApproachAPIStatus === API_FETCHING ? (
               <OverlayLoader />
            ) : null}
            <LeftAndRightSections>
               <SolutionApproachLeftSection>
                  <TextLabel>{solutionApproach.title}</TextLabel>
                  <TitleInputField
                     value={this.title}
                     onChange={this.onChangeTitle}
                     type={solutionApproach.titleInputFieldType}
                     placeholder={solutionApproach.titleInputFieldPlaceholder}
                  />
                  {this.titleErrorMessage && (
                     <ErrorMessage>{this.titleErrorMessage}</ErrorMessage>
                  )}
                  <TextLabel>{solutionApproach.description}</TextLabel>
                  <TextEditorContainer>
                     <TextEditorHeader
                        onChangeTextType={this.onChangeDescriptionType}
                        selectedOption={this.description.type}
                     />
                     <ContentEditor
                        contentType={this.description.type}
                        content={this.description.content}
                        onChangeContent={this.onChangeDescriptionContent}
                     />
                     {this.descriptionErrorMessage && (
                        <ErrorMessage>
                           {this.descriptionErrorMessage}
                        </ErrorMessage>
                     )}
                  </TextEditorContainer>
                  <TextLabel>{solutionApproach.complexityAnalysis}</TextLabel>
                  <TextEditorContainer>
                     <TextEditorHeader
                        onChangeTextType={this.onChangeComplexityAnalysisType}
                        selectedOption={this.complexityAnalysis.type}
                     />
                     <ContentEditor
                        contentType={this.complexityAnalysis.type}
                        content={this.complexityAnalysis.content}
                        onChangeContent={this.onChangeComplexityAnalysisContent}
                     />
                     {this.complexityAnalysisErrorMessage && (
                        <ErrorMessage>
                           {this.complexityAnalysisErrorMessage}
                        </ErrorMessage>
                     )}
                  </TextEditorContainer>
               </SolutionApproachLeftSection>
               <SolutionApproachRightSection>
                  {this.renderPreviewer()}
               </SolutionApproachRightSection>
            </LeftAndRightSections>
            <SaveButtonContainer>
               <Button
                  onClickButton={this.onClickSaveButton}
                  backgroundColor={colors.greenishTeal}
                  textColor={colors.white}
                  buttonText={commonComponents.save}
               />
            </SaveButtonContainer>
         </SolutionApproachContainer>
      )
   }
}

export { SolutionApproach }
