import React from 'react'

import { NumberButton } from '../../../Common/components/NumberButton'
import { CircleAddButton } from '../../../Common/components/CircleAddButton'
import { ContentEditor } from '../../../Common/components/ContentEditor'
import { SaveButton } from '../../../Common/components/SaveButton'

import i18n from '../../i18n/strings.json'

import {
   TestCasesContainer,
   ButtonsContainer,
   LabelAndEditorContainer,
   TextLabel,
   ScoreInputField,
   CheckboxContainer,
   Checkbox,
   CheckboxLabel,
   SaveButtonContainer
} from './styledComponents'

type TestCasesProps = {
   content: string
}

class TestCases extends React.Component<TestCasesProps> {
   render() {
      const { content } = this.props
      const { testCases } = i18n
      return (
         <TestCasesContainer>
            <ButtonsContainer>
               <NumberButton
                  isActive={true}
                  number={1}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  isActive={false}
                  number={2}
                  onClickNumberButton={() => {}}
               />
               <CircleAddButton onClickCircleAddButton={() => {}} />
            </ButtonsContainer>
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
         </TestCasesContainer>
      )
   }
}

export { TestCases }
