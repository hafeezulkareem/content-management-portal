import { observable } from 'mobx'
import { StatementModel } from '../StatementModel'
import { RoughSolutionModel } from '../RoughSolutionModel'

class CodingProblemDetailsModel {
   @observable codingProblemId: number
   @observable statement: StatementModel
   @observable roughSolutions: Array<RoughSolutionModel>

   constructor(codingProblemDetails) {
      this.codingProblemId = codingProblemDetails.question_id
      this.statement = new StatementModel(codingProblemDetails.statement)
      this.roughSolutions = codingProblemDetails.roughSolutions.forEach(
         roughSolution => new RoughSolutionModel(roughSolution)
      )
   }
}

export { CodingProblemDetailsModel }
