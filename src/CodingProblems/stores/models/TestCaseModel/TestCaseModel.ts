import { observable } from 'mobx'

class TestCaseModel {
   id
   number
   @observable input
   @observable output
   @observable score
   @observable isHidden
   @observable isActive

   constructor(testCaseDetails) {
      this.id = testCaseDetails.test_case_id
      this.number = testCaseDetails.test_case_number
      this.input = testCaseDetails.input
      this.output = testCaseDetails.output
      this.score = testCaseDetails.score
      this.isHidden = testCaseDetails.is_hidden
      this.isActive = true
   }

   setActiveState() {
      this.isActive = true
   }

   removeActiveState() {
      this.isActive = false
   }
}

export { TestCaseModel }
