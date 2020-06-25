import { observable } from 'mobx'

class TestCaseModel {
   uniqueId: string
   id: string
   @observable number: number
   @observable input: string
   @observable output: string
   @observable score: number
   @observable isHidden: boolean
   @observable isActive: boolean

   constructor({ uniqueId, testCaseDetails }) {
      this.uniqueId = uniqueId
      this.id = testCaseDetails.test_case_id
      this.number = testCaseDetails.test_case_number
      this.input = testCaseDetails.input
      this.output = testCaseDetails.output
      this.score = testCaseDetails.score
      this.isHidden = testCaseDetails.is_hidden
      this.isActive = true
   }

   updateNumber(updatedNumber: number) {
      this.number = updatedNumber
   }

   setActiveState() {
      this.isActive = true
   }

   removeActiveState() {
      this.isActive = false
   }
}

export { TestCaseModel }
