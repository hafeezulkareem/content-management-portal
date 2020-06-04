import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap, toJS } from 'mobx'

import commonI18n from '../../../Common/i18n/strings.json'

import { HintModel } from '../../stores/models/HintModel'
import i18n from '../../i18n/strings.json'

import { TestCasesAndHintsNavigation } from '../TestCasesAndHintsNavigation'
import { HintsContentSection } from '../HintsContentSection'

import { HintsContainer, ButtonsContainer } from './styledComponents'

type HintsProps = {
   codingProblemsStore: any
   hints: any
   showToastMessage: any
   updateDataStatus: any
}

@observer
class Hints extends React.Component<HintsProps> {
   @observable hintsList!: ObservableMap<any, any>
   @observable titleErrorMessage!: string | null
   @observable descriptionErrorMessage!: string | null
   currentHintNumber!: number
   currentDeletingHintUniqueId!: number | null
   previousHintsData: any

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.hintsList = new ObservableMap(new Map())
      this.currentHintNumber = 0
      this.currentDeletingHintUniqueId = null
      this.initErrors()
   }

   initErrors = () => {
      this.titleErrorMessage = null
      this.descriptionErrorMessage = null
   }

   setHintsDataToList = hints => {
      hints.forEach(hint => {
         this.hintsList.set(hint.uniqueId, hint)
      })
      this.toggleActiveStates(hints[0].uniqueId)
      this.currentHintNumber = hints.length
   }

   componentDidMount() {
      const {
         hints,
         codingProblemsStore: { postHintAPIResponses }
      } = this.props
      if (postHintAPIResponses.length > 0) {
         this.setHintsDataToList(postHintAPIResponses)
      } else if (hints) {
         this.setHintsDataToList(hints)
      } else {
         this.generateNewHint()
      }
      this.previousHintsData = new Map()
      this.hintsList.forEach((hint, key) => {
         this.previousHintsData.set(key, {
            title: hint.title,
            description: { ...hint.description }
         })
      })
   }

   isPreviousDataSameAsPresentData = () => {
      for (const key in toJS(this.hintsList)) {
         if (this.previousHintsData.has(key)) {
            if (
               this.previousHintsData.get(key).title !==
                  this.hintsList.get(key).title ||
               this.previousHintsData.get(key).description.content !==
                  this.hintsList.get(key).description.content ||
               this.previousHintsData
                  .get(key)
                  .description.contentType.toLowerCase() !==
                  this.hintsList.get(key).description.contentType.toLowerCase()
            ) {
               return false
            }
         } else {
            if (
               '' !== this.hintsList.get(key).title ||
               '' !== this.hintsList.get(key).description.content
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
      const hints = Array.from(this.hintsList.values())
      hints.map((hint: HintModel) => {
         return hint.uniqueId === uniqueId
            ? hint.setActiveState()
            : hint.removeActiveState()
      })
   }

   generateNewHint = () => {
      const { textEditorTypes } = commonI18n
      const uniqueId = Math.random().toString()
      this.currentHintNumber += 1
      this.hintsList.set(
         uniqueId,
         new HintModel({
            uniqueId,
            hintDetails: {
               hint_id: null,
               hint_number: this.currentHintNumber,
               title: '',
               description: {
                  content: '',
                  content_type: textEditorTypes[0].value
               }
            }
         })
      )
      this.toggleActiveStates(uniqueId)
   }

   onClickAddHintButton = () => {
      this.generateNewHint()
   }

   onClickNumberButton = uniqueId => {
      this.toggleActiveStates(uniqueId)
   }

   onChangeTitle = (event, uniqueId) => {
      const currentHint = this.hintsList.get(uniqueId)
      currentHint.title = event.target.value
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeDescription = (event, uniqueId) => {
      const currentHint = this.hintsList.get(uniqueId)
      currentHint.description.content = event.target.value
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeDescriptionType = (event, uniqueId) => {
      const currentHint = this.hintsList.get(uniqueId)
      currentHint.description.contentType = event.target.value
      this.updateDataStatus()
   }

   onSuccessHintDelete = () => {
      const { showToastMessage, updateDataStatus } = this.props
      const { deleteSuccessMessages } = i18n
      updateDataStatus(true)
      showToastMessage(deleteSuccessMessages.hint, false, 700, this.deleteHint)
   }

   onFailureHintDelete = () => {
      const {
         codingProblemsStore: { deleteHintAPIError },
         showToastMessage
      } = this.props
      showToastMessage(deleteHintAPIError, true, 1500, () => {})
   }

   rearrangeTestCasesOrder = () => {
      const testCases = Array.from(this.hintsList.values())
      testCases.forEach((hint, index) => {
         hint.updateNumber(index + 1)
      })
   }

   deleteHint = () => {
      const hints = Array.from(this.hintsList.values())
      const currentHintIndex = hints.findIndex(
         (hint: HintModel) => hint.uniqueId === this.currentDeletingHintUniqueId
      )
      if (hints[currentHintIndex].isActive) {
         if (hints[currentHintIndex + 1]) {
            this.toggleActiveStates(hints[currentHintIndex + 1].uniqueId)
         } else if (hints[currentHintIndex - 1]) {
            this.toggleActiveStates(hints[currentHintIndex - 1].uniqueId)
         }
      }
      this.hintsList.delete(this.currentDeletingHintUniqueId)
      this.currentHintNumber = this.hintsList.size
      this.rearrangeTestCasesOrder()
   }

   checkTestCaseNumberAndDelete = uniqueId => {
      const hints = Array.from(this.hintsList.values())
      const currentHint = hints.find(
         (hint: HintModel) => hint.uniqueId === uniqueId
      )
      if (currentHint.id !== null) {
         const {
            codingProblemsStore: { deleteProblemHint }
         } = this.props
         deleteProblemHint(
            currentHint.id,
            this.onSuccessHintDelete,
            this.onFailureHintDelete
         )
      } else {
         this.deleteHint()
      }
   }

   onClickDeleteButton = uniqueId => {
      this.currentDeletingHintUniqueId = uniqueId
      this.checkTestCaseNumberAndDelete(uniqueId)
   }

   areAllFieldsFilled = uniqueId => {
      const {
         hints: { errors }
      } = i18n
      const currentHint = this.hintsList.get(uniqueId)
      const {
         title,
         description: { content }
      } = currentHint
      if (!title.trim()) {
         this.titleErrorMessage = errors.title
         return false
      } else if (!content.trim()) {
         this.descriptionErrorMessage = errors.description
         return false
      }
      this.initErrors()
      return true
   }

   onSuccessPostHint = () => {
      const { showToastMessage } = this.props
      const { postSuccessMessages } = i18n
      showToastMessage(postSuccessMessages.hints, false, 700, () => {})
   }

   onFailurePostHint = () => {
      const {
         codingProblemsStore: { postHintAPIError },
         showToastMessage
      } = this.props
      showToastMessage(postHintAPIError, true, 1500, () => {})
   }

   onClickSaveButton = uniqueId => {
      const {
         codingProblemsStore: { codingProblemId },
         showToastMessage
      } = this.props
      if (codingProblemId !== null) {
         if (this.areAllFieldsFilled(uniqueId)) {
            const currentHint = this.hintsList.get(uniqueId)
            const { codingProblemsStore } = this.props
            codingProblemsStore.postProblemHint(
               {
                  hint_id: currentHint.id,
                  hint_number: currentHint.number,
                  title: currentHint.title,
                  description: {
                     content: currentHint.description.content,
                     content_type: currentHint.description.contentType
                  }
               },
               this.onSuccessPostHint,
               this.onFailurePostHint
            )
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
         <HintsContainer>
            <ButtonsContainer>
               <TestCasesAndHintsNavigation
                  buttonsList={this.hintsList}
                  onClickAddButton={this.onClickAddHintButton}
                  onClickNumberButton={this.onClickNumberButton}
                  onClickDeleteButton={this.onClickDeleteButton}
               />
            </ButtonsContainer>
            {Array.from(this.hintsList.values()).map((hint: HintModel) =>
               hint.isActive ? (
                  <HintsContentSection
                     key={hint.uniqueId}
                     uniqueId={hint.uniqueId}
                     title={hint.title}
                     onChangeTitle={this.onChangeTitle}
                     titleErrorMessage={this.titleErrorMessage}
                     descriptionType={hint.description.contentType}
                     onChangeDescriptionType={this.onChangeDescriptionType}
                     description={hint.description.content}
                     onChangeDescription={this.onChangeDescription}
                     descriptionErrorMessage={this.descriptionErrorMessage}
                     onClickSaveButton={this.onClickSaveButton}
                  />
               ) : null
            )}
         </HintsContainer>
      )
   }
}

export { Hints }
