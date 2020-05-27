import React from 'react'

import { NumberButton } from '../../../common/components/NumberButton'
import { CircleAddButton } from '../../../common/components/CircleAddButton'
import { ContentEditor } from '../../../common/components/ContentEditor'
import { SaveButton } from '../../../common/components/SaveButton'

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

class TestCases extends React.Component {
   render() {
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
               <ContentEditor contentType={testCases.contentType} />
            </LabelAndEditorContainer>
            <LabelAndEditorContainer>
               <TextLabel>{testCases.output}</TextLabel>
               <ContentEditor contentType={testCases.contentType} />
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
