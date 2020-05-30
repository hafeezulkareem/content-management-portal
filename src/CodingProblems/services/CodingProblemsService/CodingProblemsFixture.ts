import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import problemRoughSolutionResponse from '../../fixtures/postProblemRoughSolutionResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import codingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI(dataObject) {
      return new Promise((resolve, reject) => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI(dataObject) {
      return new Promise((resolve, reject) =>
         resolve(problemRoughSolutionResponse)
      )
   }

   deleteRoughSolutionAPI() {
      return new Promise((resolve, reject) => {
         resolve('Rough solution is deleted')
      })
   }

   getCodingProblemsAPI() {
      return new Promise((resolve, reject) => resolve(codingProblemsResponse))
   }

   getCodingProblemDetailsAPI() {
      return new Promise((resolve, reject) =>
         resolve(codingProblemDetailsResponse)
      )
   }
}

export { CodingProblemsFixture }
