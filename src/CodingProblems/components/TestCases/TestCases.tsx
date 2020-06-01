import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap } from 'mobx'

import { TestCaseModel } from '../../stores/models/TestCaseModel'
import { NUMBER_REGEX } from '../../constants/RegexConstants'

import { TestCasesAndHintsNavigation } from '../TestCasesAndHintsNavigation'
import { TestCasesContentSection } from '../TestCasesContentSection'

import { TestCasesContainer, ButtonsContainer } from './styledComponents'

type TestCasesProps = {
   content: string
}

@observer
class TestCases extends React.Component<TestCasesProps> {
   @observable testCasesList!: ObservableMap<any, any>
   @observable inputErrorMessage!: string | null
   @observable outputErrorMessage!: string | null
   @observable scoreErrorMessage!: string | null
   @observable postTestCaseError!: string | null
   @observable deleteTestCaseError!: string | null
   currentTestCaseNumber!: number

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.testCasesList = new ObservableMap(new Map())
      this.currentTestCaseNumber = 1
      this.initializeErrors()
      this.generateNewTestCase()
   }

   initializeErrors = () => {
      this.inputErrorMessage = null
      this.outputErrorMessage = null
      this.scoreErrorMessage = null
      this.postTestCaseError = null
      this.deleteTestCaseError = null
   }

   toggleActiveStates = activeNumber => {
      const testCases = Array.from(this.testCasesList.values())
      testCases.map((testCase: TestCaseModel) => {
         return testCase.number === activeNumber
            ? testCase.setActiveState()
            : testCase.removeActiveState()
      })
   }

   generateNewTestCase = () => {
      this.testCasesList.set(
         this.currentTestCaseNumber,
         new TestCaseModel({
            test_case_id: null,
            test_case_number: this.currentTestCaseNumber,
            input: '',
            output: '',
            score: '',
            is_hidden: false
         })
      )
      this.toggleActiveStates(this.currentTestCaseNumber)
      this.currentTestCaseNumber += 1
   }

   onClickAddTestCaseButton = () => {
      this.generateNewTestCase()
   }

   onClickNumberButton = buttonNumber => {
      this.toggleActiveStates(buttonNumber)
   }

   checkTestCaseNumberAndDelete = (testCaseNumber: number) => {
      const testCases = Array.from(this.testCasesList.values())
      const currentTestCaseIndex = testCases.findIndex(
         (testCase: TestCaseModel) => testCase.number === testCaseNumber
      )
      if (testCases[currentTestCaseIndex].isActive) {
         if (testCases[currentTestCaseIndex + 1]) {
            this.toggleActiveStates(testCases[currentTestCaseIndex + 1].number)
         } else if (testCases[currentTestCaseIndex - 1]) {
            this.toggleActiveStates(testCases[currentTestCaseIndex - 1].number)
         }
      }
      this.testCasesList.delete(testCaseNumber)
   }

   onClickDeleteButton = (event, testCaseNumber) => {
      this.checkTestCaseNumberAndDelete(testCaseNumber)
   }

   onChangeInput = (updatedInput, testCaseNumber) => {
      const currentTestCase: TestCaseModel = this.testCasesList.get(
         testCaseNumber
      )
      currentTestCase.input = updatedInput
      this.initializeErrors()
   }

   onChangeOutput = (updatedOutput, testCaseNumber) => {
      const currentTestCase = this.testCasesList.get(testCaseNumber)
      currentTestCase.output = updatedOutput
      this.initializeErrors()
   }

   onChangeScore = (event, testCaseNumber) => {
      const currentTestCase = this.testCasesList.get(testCaseNumber)
      const updatedScore = event.target.value
      if (updatedScore.match(NUMBER_REGEX) || updatedScore === '') {
         currentTestCase.score =
            updatedScore !== '' ? Number.parseInt(event.target.value) : ''
         this.initializeErrors()
      } else {
         this.scoreErrorMessage = 'Invalid input'
      }
   }

   onToggleIsHidden = (event, testCaseNumber) => {
      const currentTestCase = this.testCasesList.get(testCaseNumber)
      currentTestCase.isHidden = event.target.checked
      this.initializeErrors()
   }

   areAllFieldsFilled = testCaseNumber => {
      const currentTestCase = this.testCasesList.get(testCaseNumber)
      if (!currentTestCase.input.trim()) {
         this.inputErrorMessage = 'Input is required'
         return false
      } else if (!currentTestCase.output.trim()) {
         this.outputErrorMessage = 'Output is required'
         return false
      } else if (!currentTestCase.score.toString().trim()) {
         this.scoreErrorMessage = 'Score is required'
         return false
      }
      this.initializeErrors()
      return true
   }

   onClickSaveButton = testCaseNumber => {
      if (this.areAllFieldsFilled(testCaseNumber)) {
         // TODO: API Call
      }
   }

   render() {
      return (
         <TestCasesContainer>
            <ButtonsContainer>
               <TestCasesAndHintsNavigation
                  onClickAddButton={this.onClickAddTestCaseButton}
                  buttonsList={this.testCasesList}
                  onClickNumberButton={this.onClickNumberButton}
                  onClickDeleteButton={this.onClickDeleteButton}
               />
            </ButtonsContainer>
            {Array.from(
               this.testCasesList.values()
            ).map((testCase: TestCaseModel) =>
               testCase.isActive ? (
                  <TestCasesContentSection
                     key={testCase.number}
                     testCaseNumber={testCase.number}
                     input={testCase.input}
                     onChangeInput={this.onChangeInput}
                     output={testCase.output}
                     onChangeOutput={this.onChangeOutput}
                     score={testCase.score}
                     onChangeScore={this.onChangeScore}
                     isHidden={testCase.isHidden}
                     onToggleIsHidden={this.onToggleIsHidden}
                     onClickSaveButton={this.onClickSaveButton}
                     inputErrorMessage={this.inputErrorMessage}
                     outputErrorMessage={this.outputErrorMessage}
                     scoreErrorMessage={this.scoreErrorMessage}
                  />
               ) : null
            )}
         </TestCasesContainer>
      )
   }
}

export { TestCases }
