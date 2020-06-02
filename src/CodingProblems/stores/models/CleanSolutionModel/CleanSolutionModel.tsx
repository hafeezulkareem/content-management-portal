import { observable } from 'mobx'

class CleanSolutionModel {
   uniqueId
   id
   @observable fileName
   @observable language
   @observable solutionContent

   constructor({ uniqueId, cleanSolutionDetails }) {
      this.uniqueId = uniqueId
      this.id = cleanSolutionDetails.clean_solution_id
      this.fileName = cleanSolutionDetails.file_name
      this.language = cleanSolutionDetails.language
      this.solutionContent = cleanSolutionDetails.solution_content
   }
}

export { CleanSolutionModel }
