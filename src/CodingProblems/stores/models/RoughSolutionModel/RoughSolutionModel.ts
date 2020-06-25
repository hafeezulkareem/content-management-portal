import { observable } from 'mobx'

class RoughSolutionModel {
   uniqueId: string
   id: number
   @observable language: string
   @observable solutionContent: string
   @observable fileName: string

   constructor({ uniqueId, roughSolutionDetails }) {
      this.uniqueId = uniqueId
      this.language = roughSolutionDetails.language
      this.solutionContent = roughSolutionDetails.solution_content
      this.fileName = roughSolutionDetails.file_name
      this.id =
         roughSolutionDetails.rough_solution_id !== undefined
            ? roughSolutionDetails.rough_solution_id
            : roughSolutionDetails.prefilled_code_id
   }
}

export { RoughSolutionModel }
