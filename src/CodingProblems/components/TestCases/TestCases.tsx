import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap, toJS } from 'mobx'

import { TestCaseModel } from '../../stores/models/TestCaseModel'
import { NUMBER_REGEX } from '../../constants/RegexConstants'
import i18n from '../../i18n/strings.json'

import { TestCasesAndHintsNavigation } from '../TestCasesAndHintsNavigation'
import { TestCasesContentSection } from '../TestCasesContentSection'

import { TestCasesContainer, ButtonsContainer } from './styledComponents'

type TestCasesProps = {
   codingProblemStore: any
   testCases: any
   showToastMessage: any
   updateDataStatus: any
}

@observer
class TestCases extends React.Component<TestCasesProps> {
   @observable testCasesList!: ObservableMap<any, any>
   @observable inputErrorMessage!: string | null
   @observable outputErrorMessage!: string | null
   @observable scoreErrorMessage!: string | null
   currentTestCaseNumber!: number
   currentDeletingTestCaseUniqueId!: number | null
   previousTestCaseData: any

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.testCasesList = new ObservableMap(new Map())
      this.currentTestCaseNumber = 0
      this.currentDeletingTestCaseUniqueId = null
      this.initializeErrors()
   }

   initializeErrors = () => {
      this.inputErrorMessage = null
      this.outputErrorMessage = null
      this.scoreErrorMessage = null
   }

   setTestCasesDataToList = testCases => {
      testCases.forEach(testCase => {
         this.testCasesList.set(testCase.uniqueId, testCase)
      })
      this.toggleActiveStates(testCases[0].uniqueId)
      this.currentTestCaseNumber = testCases.length
   }

   componentDidMount() {
      const {
         testCases,
         codingProblemStore: { postTestCaseAPIResponses }
      } = this.props
      if (postTestCaseAPIResponses.length > 0) {
         this.setTestCasesDataToList(postTestCaseAPIResponses)
      } else if (testCases) {
         this.setTestCasesDataToList(testCases)
      } else {
         this.generateNewTestCase()
      }
      this.previousTestCaseData = new Map()
      this.testCasesList.forEach((testCase, key) => {
         this.previousTestCaseData.set(key, { ...testCase })
      })
   }

   isPreviousDataSameAsPresentData = () => {
      for (const key in toJS(this.testCasesList)) {
         if (this.previousTestCaseData.has(key)) {
            if (
               this.previousTestCaseData.get(key).input !==
                  this.testCasesList.get(key).input ||
               this.previousTestCaseData.get(key).output !==
                  this.testCasesList.get(key).output ||
               this.previousTestCaseData.get(key).score.toString() !==
                  this.testCasesList.get(key).score.toString() ||
               this.previousTestCaseData.get(key).isHidden !==
                  this.testCasesList.get(key).isHidden
            ) {
               return false
            }
         } else {
            if (
               '' !== this.testCasesList.get(key).input ||
               '' !== this.testCasesList.get(key).output ||
               '' !== this.testCasesList.get(key).score
            ) {
               return false
            }
         }
      }
      return true
   }

   updateDataStatus = () => {
      const { updateDataStatus } = this.props
      if (this.isPreviousDataSameAsPresentData()) {
         updateDataStatus(true)
      } else {
         updateDataStatus(false)
      }
   }

   toggleActiveStates = uniqueId => {
      const testCases = Array.from(this.testCasesList.values())
      testCases.map((testCase: TestCaseModel) => {
         return testCase.uniqueId === uniqueId
            ? testCase.setActiveState()
            : testCase.removeActiveState()
      })
   }

   generateNewTestCase = () => {
      const uniqueId = Math.random().toString()
      this.currentTestCaseNumber += 1
      this.testCasesList.set(
         uniqueId,
         new TestCaseModel({
            uniqueId,
            testCaseDetails: {
               test_case_id: null,
               test_case_number: this.currentTestCaseNumber,
               input: '',
               output: '',
               score: '',
               is_hidden: false
            }
         })
      )
      this.toggleActiveStates(uniqueId)
   }

   onClickAddTestCaseButton = () => {
      this.generateNewTestCase()
   }

   onClickNumberButton = uniqueId => {
      this.toggleActiveStates(uniqueId)
   }

   onSuccessTestCaseDelete = () => {
      const { showToastMessage } = this.props
      const { deleteSuccessMessages } = i18n as any
      showToastMessage(
         deleteSuccessMessages.testCase,
         false,
         700,
         this.deleteTestCase
      )
   }

   onFailureTestCaseDelete = () => {
      const {
         codingProblemStore: { deleteTestCaseAPIError },
         showToastMessage
      } = this.props
      showToastMessage(deleteTestCaseAPIError, true, 1500, () => {})
   }

   checkTestCaseNumberAndDelete = uniqueId => {
      const {
         codingProblemStore: { codingProblemId }
      } = this.props
      if (codingProblemId) {
         const testCases = Array.from(this.testCasesList.values())
         const currentTest = testCases.find(
            (testCase: TestCaseModel) => testCase.uniqueId === uniqueId
         )
         const { codingProblemStore } = this.props
         codingProblemStore.deleteProblemTestCase(
            codingProblemId,
            currentTest.id,
            this.onSuccessTestCaseDelete,
            this.onFailureTestCaseDelete
         )
      } else {
         this.deleteTestCase()
      }
   }

   rearrangeTestCasesOrder = () => {
      const testCases = Array.from(this.testCasesList.values())
      testCases.forEach((testCase, index) => {
         testCase.updateNumber(index + 1)
      })
   }

   deleteTestCase = () => {
      const testCases = Array.from(this.testCasesList.values())
      const currentTestCaseIndex = testCases.findIndex(
         (testCase: TestCaseModel) =>
            testCase.uniqueId === this.currentDeletingTestCaseUniqueId
      )
      if (testCases[currentTestCaseIndex].isActive) {
         if (testCases[currentTestCaseIndex + 1]) {
            this.toggleActiveStates(
               testCases[currentTestCaseIndex + 1].uniqueId
            )
         } else if (testCases[currentTestCaseIndex - 1]) {
            this.toggleActiveStates(
               testCases[currentTestCaseIndex - 1].uniqueId
            )
         }
      }
      this.testCasesList.delete(this.currentDeletingTestCaseUniqueId)
      this.currentTestCaseNumber = this.testCasesList.size
      this.rearrangeTestCasesOrder()
   }

   onClickDeleteButton = uniqueId => {
      this.currentDeletingTestCaseUniqueId = uniqueId
      this.checkTestCaseNumberAndDelete(uniqueId)
   }

   onChangeInput = (updatedInput, uniqueId) => {
      const currentTestCase: TestCaseModel = this.testCasesList.get(uniqueId)
      currentTestCase.input = updatedInput
      this.initializeErrors()
      this.updateDataStatus()
   }

   onChangeOutput = (updatedOutput, uniqueId) => {
      const currentTestCase = this.testCasesList.get(uniqueId)
      currentTestCase.output = updatedOutput
      this.initializeErrors()
      this.updateDataStatus()
   }

   onChangeScore = (event, uniqueId) => {
      const {
         testCases: { errors }
      } = i18n
      const currentTestCase = this.testCasesList.get(uniqueId)
      const updatedScore = event.target.value
      if (updatedScore.match(NUMBER_REGEX) || updatedScore === '') {
         currentTestCase.score =
            updatedScore !== '' ? Number.parseInt(event.target.value) : ''
         this.initializeErrors()
         this.updateDataStatus()
      } else {
         this.scoreErrorMessage = errors.invalidInput
      }
   }

   onToggleIsHidden = (event, uniqueId) => {
      const currentTestCase = this.testCasesList.get(uniqueId)
      currentTestCase.isHidden = event.target.checked
      this.initializeErrors()
      this.updateDataStatus()
   }

   areAllFieldsFilled = uniqueId => {
      const {
         testCases: { errors }
      } = i18n
      const currentTestCase = this.testCasesList.get(uniqueId)
      if (!currentTestCase.input.trim()) {
         this.inputErrorMessage = errors.inputIsRequired
         return false
      } else if (!currentTestCase.output.trim()) {
         this.outputErrorMessage = errors.outputIsRequired
         return false
      } else if (!currentTestCase.score.toString().trim()) {
         this.scoreErrorMessage = errors.scoreIsRequired
         return false
      }
      this.initializeErrors()
      return true
   }

   onSuccessPostTestCase = () => {
      const { showToastMessage, updateDataStatus } = this.props
      const { postSuccessMessages } = i18n as any
      updateDataStatus(true)
      showToastMessage(postSuccessMessages.testCases, false, 700, () => {})
   }

   onFailurePostTestCase = () => {
      const {
         codingProblemStore: { postTestCaseAPIError },
         showToastMessage
      } = this.props
      showToastMessage(postTestCaseAPIError, true, 1500, () => {})
   }

   onClickSaveButton = uniqueId => {
      const {
         codingProblemStore: { codingProblemId },
         showToastMessage
      } = this.props
      if (codingProblemId !== null) {
         if (this.areAllFieldsFilled(uniqueId)) {
            const currentTestCase = this.testCasesList.get(uniqueId)
            const { codingProblemStore } = this.props
            codingProblemStore.postProblemTestCase(
               {
                  test_case_id: currentTestCase.id,
                  test_case_number: currentTestCase.number,
                  input: currentTestCase.input,
                  output: currentTestCase.output,
                  score: currentTestCase.score,
                  is_hidden: currentTestCase.isHidden
               },
               this.onSuccessPostTestCase,
               this.onFailurePostTestCase
            )
            console.log('Test Case Posting Data:- ', {
               test_case_id: currentTestCase.id,
               test_case_number: currentTestCase.number,
               input: currentTestCase.input,
               output: currentTestCase.output,
               score: currentTestCase.score,
               is_hidden: currentTestCase.isHidden
            })
         }
      } else {
         const { updateDataStatus } = this.props
         updateDataStatus(true)
         const { firstCreateTheStatement } = i18n
         showToastMessage(firstCreateTheStatement, true, 1500, () => {})
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
                     uniqueId={testCase.uniqueId}
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
