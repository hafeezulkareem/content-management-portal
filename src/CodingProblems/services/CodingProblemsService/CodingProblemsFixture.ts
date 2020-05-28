import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'

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
}

export { CodingProblemsFixture }
