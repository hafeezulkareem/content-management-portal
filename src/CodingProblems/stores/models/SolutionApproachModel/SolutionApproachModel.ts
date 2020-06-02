import { observable } from 'mobx'

class SolutionApproachModel {
   solutionApproachId
   @observable title
   @observable description
   @observable complexityAnalysis

   constructor(solutionApproachDetails) {
      this.solutionApproachId = solutionApproachDetails.solution_approach_id
      this.title = solutionApproachDetails.title
      this.description = {
         type: solutionApproachDetails.description.type,
         content: solutionApproachDetails.description.content
      }
      this.complexityAnalysis = {
         type: solutionApproachDetails.complexity_analysis.type,
         content: solutionApproachDetails.complexity_analysis.content
      }
   }
}

export { SolutionApproachModel }
