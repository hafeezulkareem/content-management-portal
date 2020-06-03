import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap } from 'mobx'

import { HintModel } from '../../stores/models/HintModel'
import i18n from '../../i18n/strings.json'
import { NUMBER_REGEX } from '../../constants/RegexConstants'

import { TestCasesAndHintsNavigation } from '../TestCasesAndHintsNavigation'
import { HintsContentSection } from '../HintsContentSection'

import { HintsContainer, ButtonsContainer } from './styledComponents'

type HintsProps = {
   codingProblemsStore: any
   hints: any
   showToastMessage: any
}

@observer
class Hints extends React.Component<HintsProps> {
   @observable hintsList!: ObservableMap<any, any>
   codingProblemId!: number | null
   @observable titleErrorMessage!: string | null
   @observable descriptionErrorMessage!: string | null
   @observable orderErrorMessage!: string | null
   currentHintNumber!: number
   currentDeletingHintUniqueId!: number | null

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.hintsList = new ObservableMap(new Map())
      this.currentHintNumber = 0
      this.codingProblemId = null
      this.currentDeletingHintUniqueId = null
      this.initErrors()
   }

   initErrors = () => {
      this.titleErrorMessage = null
      this.descriptionErrorMessage = null
      this.orderErrorMessage = null
   }

   componentDidMount() {
      const {
         hints,
         codingProblemsStore: { codingProblemId }
      } = this.props
      if (hints) {
         this.codingProblemId = codingProblemId
         hints.forEach(hint => {
            this.hintsList.set(hint.uniqueId, hint)
         })
         this.toggleActiveStates(hints[0].uniqueId)
         this.currentHintNumber = hints.length
      } else {
         this.generateNewHint()
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
      const uniqueId = Math.random().toString()
      this.currentHintNumber += 1
      this.hintsList.set(
         uniqueId,
         new HintModel({
            uniqueId,
            number: this.currentHintNumber,
            hintDetails: {
               hint_id: null,
               title: '',
               description: '',
               order: ''
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
   }

   onChangeDescription = (event, uniqueId) => {
      const currentHint = this.hintsList.get(uniqueId)
      currentHint.description = event.target.value
      this.initErrors()
   }

   onChangeOrder = (event, uniqueId) => {
      const {
         hints: { errors }
      } = i18n
      const currentHint = this.hintsList.get(uniqueId)
      const updatedOrder = event.target.value
      if (updatedOrder.match(NUMBER_REGEX) || updatedOrder === '') {
         currentHint.order =
            updatedOrder !== '' ? Number.parseInt(updatedOrder) : ''
         this.initErrors()
      } else {
         this.orderErrorMessage = errors.orderInvalid
      }
   }

   onSuccessHintDelete = () => {
      const { showToastMessage } = this.props
      const { deleteSuccessMessages } = i18n
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
      if (this.codingProblemId) {
         const hints = Array.from(this.hintsList.values())
         const currentHintIndex = hints.findIndex(
            (hint: HintModel) => hint.uniqueId === uniqueId
         )
         const {
            codingProblemsStore: { deleteProblemHint }
         } = this.props
         deleteProblemHint(
            this.codingProblemId,
            hints[currentHintIndex].id,
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
      if (!currentHint.title.trim()) {
         this.titleErrorMessage = errors.title
         return false
      } else if (!currentHint.description.trim()) {
         this.descriptionErrorMessage = errors.description
         return false
      } else if (!currentHint.order.toString().trim()) {
         this.orderErrorMessage = errors.order
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
      if (this.areAllFieldsFilled(uniqueId)) {
         const currentHint = this.hintsList.get(uniqueId)
         const { codingProblemsStore } = this.props
         codingProblemsStore.postProblemHint(
            {
               hint_id: currentHint.id,
               title: currentHint.title,
               description: currentHint.description,
               order: currentHint.order
            },
            this.onSuccessPostHint,
            this.onFailurePostHint
         )
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
                     uniqueId={hint.uniqueId}
                     title={hint.title}
                     onChangeTitle={this.onChangeTitle}
                     titleErrorMessage={this.titleErrorMessage}
                     description={hint.description}
                     onChangeDescription={this.onChangeDescription}
                     descriptionErrorMessage={this.descriptionErrorMessage}
                     order={hint.order}
                     onChangeOrder={this.onChangeOrder}
                     orderErrorMessage={this.orderErrorMessage}
                     onClickSaveButton={this.onClickSaveButton}
                  />
               ) : null
            )}
         </HintsContainer>
      )
   }
}

export { Hints }
