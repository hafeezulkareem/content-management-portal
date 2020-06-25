import { observable } from 'mobx'

class CleanSolutionModel {
   uniqueId: string
   id: number
   @observable fileName: string
   @observable language: string
   @observable solutionContent: string

   constructor({ uniqueId, cleanSolutionDetails }) {
      this.uniqueId = uniqueId
      this.id = cleanSolutionDetails.clean_solution_id
      this.fileName = cleanSolutionDetails.file_name
      this.language = cleanSolutionDetails.language
      this.solutionContent = cleanSolutionDetails.solution_content
   }
}

export { CleanSolutionModel }
