import React from 'react'

import { ContentEditor } from '../../../Common/components/ContentEditor'
import { SaveButton } from '../../../Common/components/SaveButton'

import i18n from '../../i18n/strings.json'

import {
   TestCasesContentContainer,
   LabelAndEditorContainer,
   TextLabel,
   ScoreInputField,
   CheckboxContainer,
   Checkbox,
   CheckboxLabel,
   SaveButtonContainer
} from './styledComponents'

type TestCasesContentSectionProps = {
   content: string
}

class TestCasesContentSection extends React.Component<
   TestCasesContentSectionProps
> {
   render() {
      const { content } = this.props
      const { testCases } = i18n as any
      return (
         <TestCasesContentContainer>
            <LabelAndEditorContainer>
               <TextLabel>{testCases.input}</TextLabel>
               <ContentEditor
                  content={content}
                  contentType={testCases.contentType}
                  onChangeContent={() => {}}
               />
            </LabelAndEditorContainer>
            <LabelAndEditorContainer>
               <TextLabel>{testCases.output}</TextLabel>
               <ContentEditor
                  content={content}
                  contentType={testCases.contentType}
                  onChangeContent={() => {}}
               />
            </LabelAndEditorContainer>
            <TextLabel>{testCases.score}</TextLabel>
            <ScoreInputField type={testCases.contentType} />
            <CheckboxContainer>
               <Checkbox type={testCases.checkboxType} />
               <CheckboxLabel>{testCases.isHidden}</CheckboxLabel>
            </CheckboxContainer>
            <SaveButtonContainer>
               <SaveButton onClickSaveButton={() => {}} />
            </SaveButtonContainer>
         </TestCasesContentContainer>
      )
   }
}

export { TestCasesContentSection }
