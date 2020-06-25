import { observable } from 'mobx'

class SolutionApproachModel {
   solutionApproachId: number
   @observable title: string
   @observable description: {
      type: string
      content: string
   }
   @observable complexityAnalysis: {
      type: string
      content: string
   }

   constructor(solutionApproachDetails) {
      this.solutionApproachId = solutionApproachDetails.solution_approach_id
      this.title = solutionApproachDetails.title
      this.description = {
         type: solutionApproachDetails.description.content_type,
         content: solutionApproachDetails.description.content
      }
      this.complexityAnalysis = {
         type: solutionApproachDetails.complexity_analysis.content_type,
         content: solutionApproachDetails.complexity_analysis.content
      }
   }
}

export { SolutionApproachModel }
