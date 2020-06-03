import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import commonI18n from '../../../Common/i18n/strings.json'
import { TextEditorHeader } from '../../../Common/components/TextEditorHeader'
import { ContentEditor } from '../../../Common/components/ContentEditor'
import { TextPreviewer } from '../../../Common/components/TextPreviewer'
import { HtmlPreviewer } from '../../../Common/components/HtmlPreviewer'
import { MarkdownPreviewer } from '../../../Common/components/MarkdownPreviewer'
import { SaveButton } from '../../../Common/components/SaveButton'

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
   codingProblemId
   solutionApproachId!: number | null

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
      this.codingProblemId = null
      this.initErrors()
   }

   initErrors = () => {
      this.titleErrorMessage = null
      this.descriptionErrorMessage = null
      this.complexityAnalysisErrorMessage = null
   }

   componentDidMount() {
      const {
         solutionApproach,
         codingProblemsStore: { codingProblemId }
      } = this.props
      if (solutionApproach) {
         this.codingProblemId = codingProblemId
         this.title = solutionApproach.title
         this.description = { ...solutionApproach.description }
         this.complexityAnalysis = { ...solutionApproach.complexityAnalysis }
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
   }

   onChangeDescriptionType = event => {
      this.description.type = event.target.value
   }

   onChangeDescriptionContent = updatedContent => {
      this.writingField = i18n.solutionApproach.description
      this.description.content = updatedContent
      this.initErrors()
   }

   onChangeComplexityAnalysisType = event => {
      this.complexityAnalysis.type = event.target.value
   }

   onChangeComplexityAnalysisContent = updatedContent => {
      this.writingField = i18n.solutionApproach.complexityAnalysis
      this.complexityAnalysis.content = updatedContent
      this.initErrors()
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

   onSuccessPostSolutionApproach = () => {
      this.init()
      const { onSelectTab, currentTabIndex } = this.props
      onSelectTab(currentTabIndex + 1)
   }

   onFailurePostSolutionApproach = () => {}

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
      if (this.areAllFieldsFilled()) {
         const solutionApproachData = {
            solution_approach_id: this.solutionApproachId,
            title: this.title,
            description: {
               type: this.description.type,
               content: this.description.content
            },
            complexity_analysis: {
               type: this.complexityAnalysis.type,
               content: this.complexityAnalysis.content
            }
         }
         this.postSolutionApproach(solutionApproachData)
      }
   }

   render() {
      const { solutionApproach } = i18n as any
      const {
         codingProblemsStore: { postSolutionApproachAPIError }
      } = this.props
      return (
         <SolutionApproachContainer>
            {postSolutionApproachAPIError && (
               <ErrorMessage>{postSolutionApproachAPIError}</ErrorMessage>
            )}
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
               <SaveButton onClickSaveButton={this.onClickSaveButton} />
            </SaveButtonContainer>
         </SolutionApproachContainer>
      )
   }
}

export { SolutionApproach }
