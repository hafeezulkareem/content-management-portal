import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise((resolve, reject) => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI() {
      return new Promise((resolve, reject) => resolve())
   }
}

export { CodingProblemsFixture }
