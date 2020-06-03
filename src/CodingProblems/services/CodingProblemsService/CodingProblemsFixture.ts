import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import problemRoughSolutionResponse from '../../fixtures/postProblemRoughSolutionResponse.json'
import problemTestCaseResponse from '../../fixtures/postProblemTestCaseResponse.json'
import problemPrefilledCodeResponse from '../../fixtures/postProblemPrefilledCodeResponse.json'
import problemSolutionApproachResponse from '../../fixtures/postProblemSolutionApproachResponse.json'
import problemCleanSolutionResponse from '../../fixtures/postProblemCleanSolutionResponse.json'
import problemHintResponse from '../../fixtures/postProblemHintResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import codingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise(resolve => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI() {
      return new Promise(resolve => resolve(problemRoughSolutionResponse))
   }

   deleteRoughSolutionAPI() {
      return new Promise(resolve => {
         resolve('Rough solution is deleted')
      })
   }

   postProblemTestCaseAPI() {
      return new Promise(resolve => {
         resolve(problemTestCaseResponse)
      })
   }

   deleteTestCaseAPI() {
      return new Promise(resolve => {
         resolve('Test case is deleted')
      })
   }

   postPrefilledCodeAPI() {
      return new Promise(resolve => {
         resolve(problemPrefilledCodeResponse)
      })
   }

   deletePrefilledCodeAPI() {
      return new Promise(resolve => {
         resolve('Prefilled code is deleted')
      })
   }

   postSolutionApproachAPI() {
      return new Promise(resolve => {
         resolve(problemSolutionApproachResponse)
      })
   }

   postHintAPI() {
      return new Promise(resolve => {
         resolve(problemHintResponse)
      })
   }

   deleteHintAPI() {
      return new Promise(resolve => {
         resolve('Deleted successfully')
      })
   }

   postCleanSolutionAPI() {
      return new Promise(resolve => resolve(problemCleanSolutionResponse))
   }

   deleteCleanSolutionAPI() {
      return new Promise(resolve =>
         resolve('Clean solution deleted successfully')
      )
   }

   getCodingProblemsAPI() {
      return new Promise(resolve =>
         setTimeout(() => {
            resolve(codingProblemsResponse)
         }, 1000)
      )
   }

   getCodingProblemDetailsAPI() {
      return new Promise(resolve =>
         setTimeout(() => {
            resolve(codingProblemDetailsResponse)
         }, 1000)
      )
   }
}

export { CodingProblemsFixture }
