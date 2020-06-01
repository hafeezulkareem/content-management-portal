import React from 'react'
import { observer } from 'mobx-react'

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
   SaveButtonContainer,
   ErrorMessage
} from './styledComponents'

type TestCasesContentSectionProps = {
   testCaseNumber: number
   input: string
   onChangeInput: any
   output: string
   onChangeOutput: any
   score: number
   onChangeScore: any
   isHidden: boolean
   onToggleIsHidden: any
   onClickSaveButton: any
   inputErrorMessage: string | null
   outputErrorMessage: string | null
   scoreErrorMessage: string | null
}

@observer
class TestCasesContentSection extends React.Component<
   TestCasesContentSectionProps
> {
   onChangeInput = updatedInput => {
      const { onChangeInput, testCaseNumber } = this.props
      onChangeInput(updatedInput, testCaseNumber)
   }

   onChangeOutput = updatedOutput => {
      const { onChangeOutput, testCaseNumber } = this.props
      onChangeOutput(updatedOutput, testCaseNumber)
   }

   render() {
      const {
         testCaseNumber,
         input,
         output,
         score,
         onChangeScore,
         isHidden,
         onToggleIsHidden,
         onClickSaveButton,
         inputErrorMessage,
         outputErrorMessage,
         scoreErrorMessage
      } = this.props
      const { testCases } = i18n as any
      return (
         <TestCasesContentContainer>
            <LabelAndEditorContainer>
               <TextLabel>{testCases.input}</TextLabel>
               <ContentEditor
                  content={input}
                  contentType={testCases.contentType}
                  onChangeContent={this.onChangeInput}
               />
               {inputErrorMessage && (
                  <ErrorMessage>{inputErrorMessage}</ErrorMessage>
               )}
            </LabelAndEditorContainer>
            <LabelAndEditorContainer>
               <TextLabel>{testCases.output}</TextLabel>
               <ContentEditor
                  content={output}
                  contentType={testCases.contentType}
                  onChangeContent={this.onChangeOutput}
               />
               {outputErrorMessage && (
                  <ErrorMessage>{outputErrorMessage}</ErrorMessage>
               )}
            </LabelAndEditorContainer>
            <TextLabel>{testCases.score}</TextLabel>
            <ScoreInputField
               type={testCases.contentType}
               value={score}
               onChange={event => onChangeScore(event, testCaseNumber)}
            />
            {scoreErrorMessage && (
               <ErrorMessage>{scoreErrorMessage}</ErrorMessage>
            )}
            <CheckboxContainer>
               <Checkbox
                  type={testCases.checkboxType}
                  checked={isHidden}
                  onChange={event => onToggleIsHidden(event, testCaseNumber)}
               />
               <CheckboxLabel>{testCases.isHidden}</CheckboxLabel>
            </CheckboxContainer>
            <SaveButtonContainer>
               <SaveButton
                  onClickSaveButton={() => onClickSaveButton(testCaseNumber)}
               />
            </SaveButtonContainer>
         </TestCasesContentContainer>
      )
   }
}

export { TestCasesContentSection }
