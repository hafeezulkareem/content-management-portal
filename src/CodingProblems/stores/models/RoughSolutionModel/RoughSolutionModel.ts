import { observable } from 'mobx'

class RoughSolutionModel {
   @observable language: string
   @observable solutionContent: string
   @observable fileName: string
   @observable roughSolutionId: number

   constructor(roughSolutionDetails) {
      this.language = roughSolutionDetails.language
      this.solutionContent = roughSolutionDetails.solution_content
      this.fileName = roughSolutionDetails.file_name
      this.roughSolutionId =
         roughSolutionDetails.rough_solution_id !== undefined
            ? roughSolutionDetails.rough_solution_id
            : roughSolutionDetails.prefilled_code_id
   }
}

export { RoughSolutionModel }
