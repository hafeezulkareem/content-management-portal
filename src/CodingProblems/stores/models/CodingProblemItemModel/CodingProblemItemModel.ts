import { observable, action } from 'mobx'

class CodingProblemItemModel {
   id: string
   problemStatement: string
   isRoughSolutionCompleted: boolean
   isTestCasesCompleted: boolean
   isPrefilledCodeCompleted: boolean
   isSolutionApproachCompleted: boolean
   isCleanSolutionCompleted: boolean
   @observable isSelected: boolean

   constructor(codingProblemDetails) {
      this.id = Math.random().toString()
      this.problemStatement = codingProblemDetails.statement
      this.isRoughSolutionCompleted = codingProblemDetails.rough_solution_status
      this.isTestCasesCompleted = codingProblemDetails.test_cases_status
      this.isPrefilledCodeCompleted = codingProblemDetails.prefilled_code_status
      this.isSolutionApproachCompleted =
         codingProblemDetails.solution_approach_status
      this.isCleanSolutionCompleted = codingProblemDetails.clean_solution_status
      this.isSelected = false
   }

   @action.bound
   toggleCodingProblemSelection() {
      this.isSelected = !this.isSelected
   }
}

export { CodingProblemItemModel }
