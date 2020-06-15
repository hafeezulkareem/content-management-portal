import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import problemRoughSolutionResponse from '../../fixtures/postProblemRoughSolutionResponse.json'
import problemTestCaseResponse from '../../fixtures/postProblemTestCaseResponse.json'
import problemPrefilledCodeResponse from '../../fixtures/postProblemPrefilledCodeResponse.json'
import problemSolutionApproachResponse from '../../fixtures/postProblemSolutionApproachResponse.json'
import problemCleanSolutionResponse from '../../fixtures/postProblemCleanSolutionResponse.json'
import problemHintResponse from '../../fixtures/postProblemHintResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import codingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'
import { CODING_PROBLEMS_LIMIT_PER_PAGE } from '../../constants/APILimitConstants'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise(resolve => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI(codingProblemId, roughSolutionData) {
      return new Promise(resolve => resolve(problemRoughSolutionResponse))
   }

   deleteRoughSolutionAPI(codingProblemId, roughSolutionId) {
      return new Promise(resolve => {
         resolve('Rough solution is deleted')
      })
   }

   postProblemTestCaseAPI(codingProblemId, testCaseData) {
      return new Promise(resolve => {
         resolve(problemTestCaseResponse)
      })
   }

   deleteTestCaseAPI(codingProblemId, testCaseId) {
      return new Promise(resolve => {
         resolve('Test case is deleted')
      })
   }

   postPrefilledCodeAPI(codingProblemId, prefilledCodeData) {
      return new Promise(resolve => {
         resolve(problemPrefilledCodeResponse)
      })
   }

   deletePrefilledCodeAPI(codingProblemId, prefilledCodeId) {
      return new Promise(resolve => {
         resolve('Prefilled code is deleted')
      })
   }

   postSolutionApproachAPI(codingProblemId, solutionApproachData) {
      return new Promise(resolve => {
         resolve(problemSolutionApproachResponse)
      })
   }

   postHintAPI(codingProblemId, hintData) {
      return new Promise(resolve => {
         resolve(problemHintResponse)
      })
   }

   deleteHintAPI(codingProblemId, hintId) {
      return new Promise(resolve => {
         resolve('Deleted successfully')
      })
   }

   postCleanSolutionAPI(codingProblemId, cleanSolutionData) {
      return new Promise(resolve => resolve(problemCleanSolutionResponse))
   }

   deleteCleanSolutionAPI(codingProblemId, cleanSolutionId) {
      return new Promise(resolve =>
         resolve('Clean solution deleted successfully')
      )
   }

   getCodingProblemsAPI(offset) {
      return new Promise(resolve =>
         setTimeout(() => {
            resolve({
               questions_list: codingProblemsResponse['questions_list'].slice(
                  offset - 1,
                  offset + CODING_PROBLEMS_LIMIT_PER_PAGE - 1
               ),
               total_questions: codingProblemsResponse['total_questions']
            })
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
