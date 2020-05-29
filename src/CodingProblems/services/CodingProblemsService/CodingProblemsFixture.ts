import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import codingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise((resolve, reject) => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI() {
      return new Promise((resolve, reject) => resolve())
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
