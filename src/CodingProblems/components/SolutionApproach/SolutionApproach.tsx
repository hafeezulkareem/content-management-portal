import React from 'react'

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
   LeftAndRightSections
} from './styledComponents'

type SolutionApproachProps = {
   contentType: string
   content: string
}

class SolutionApproach extends React.Component<SolutionApproachProps> {
   renderPreviewer = () => {
      const { contentType, content } = this.props
      const { textEditorTypes } = commonI18n
      switch (contentType) {
         case textEditorTypes[0].optionText.toLowerCase():
            return <TextPreviewer text={content} />
         case textEditorTypes[1].optionText.toLowerCase():
            return <HtmlPreviewer htmlText={content} />
         case textEditorTypes[2].optionText.toLowerCase():
            return <MarkdownPreviewer markdownText={content} />
      }
   }

   render() {
      const { content, contentType } = this.props
      const { solutionApproach } = i18n as any
      return (
         <SolutionApproachContainer>
            <LeftAndRightSections>
               <SolutionApproachLeftSection>
                  <TextLabel>{solutionApproach.title}</TextLabel>
                  <TitleInputField
                     type={solutionApproach.titleInputFieldType}
                     placeholder={solutionApproach.titleInputFieldPlaceholder}
                  />
                  <TextLabel>{solutionApproach.description}</TextLabel>
                  <TextEditorContainer>
                     <TextEditorHeader
                        onChangeTextType={() => {}}
                        selectedOption='Text'
                     />
                     <ContentEditor
                        contentType={contentType}
                        content={content}
                        onChangeContent={() => {}}
                     />
                  </TextEditorContainer>
                  <TextLabel>{solutionApproach.complexityAnalysis}</TextLabel>
                  <TextEditorContainer>
                     <TextEditorHeader
                        onChangeTextType={() => {}}
                        selectedOption='Text'
                     />
                     <ContentEditor
                        contentType={contentType}
                        content={content}
                        onChangeContent={() => {}}
                     />
                  </TextEditorContainer>
               </SolutionApproachLeftSection>
               <SolutionApproachRightSection>
                  {this.renderPreviewer()}
               </SolutionApproachRightSection>
            </LeftAndRightSections>
            <SaveButtonContainer>
               <SaveButton onClickSaveButton={() => {}} />
            </SaveButtonContainer>
         </SolutionApproachContainer>
      )
   }
}

export { SolutionApproach }
