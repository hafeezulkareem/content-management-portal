import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise((resolve, reject) => resolve(problemStatementResponse))
   }
}

export { CodingProblemsFixture }
