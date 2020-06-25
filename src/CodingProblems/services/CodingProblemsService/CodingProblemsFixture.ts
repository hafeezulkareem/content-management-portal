import { resolveWithTimeOut } from '../../../Common/utils/TestUtils'

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

import { CodingProblemsService } from '.'

class CodingProblemsFixture implements CodingProblemsService {
   postProblemStatementAPI() {
      return resolveWithTimeOut(problemStatementResponse)
   }

   postProblemRoughSolutionAPI(codingProblemId, roughSolutionData) {
      return resolveWithTimeOut(problemRoughSolutionResponse)
   }

   deleteRoughSolutionAPI(codingProblemId, roughSolutionId) {
      return resolveWithTimeOut({})
   }

   postProblemTestCaseAPI(codingProblemId, testCaseData) {
      return resolveWithTimeOut(problemTestCaseResponse)
   }

   deleteTestCaseAPI(codingProblemId, testCaseId) {
      return resolveWithTimeOut({})
   }

   postPrefilledCodeAPI(codingProblemId, prefilledCodeData) {
      return resolveWithTimeOut(problemPrefilledCodeResponse)
   }

   deletePrefilledCodeAPI(codingProblemId, prefilledCodeId) {
      return resolveWithTimeOut({})
   }

   postSolutionApproachAPI(codingProblemId, solutionApproachData) {
      return resolveWithTimeOut(problemSolutionApproachResponse)
   }

   postHintAPI(codingProblemId, hintData) {
      return resolveWithTimeOut(problemHintResponse)
   }

   deleteHintAPI(codingProblemId, hintId) {
      return resolveWithTimeOut({})
   }

   postCleanSolutionAPI(codingProblemId, cleanSolutionData) {
      return resolveWithTimeOut(problemCleanSolutionResponse)
   }

   deleteCleanSolutionAPI(codingProblemId, cleanSolutionId) {
      return resolveWithTimeOut({})
   }

   getCodingProblemsAPI(offset) {
      return resolveWithTimeOut({
         total_questions: codingProblemsResponse['total_questions'],
         offset,
         limit: CODING_PROBLEMS_LIMIT_PER_PAGE,
         questions_list: codingProblemsResponse['questions_list'].slice(
            offset - 1,
            offset + CODING_PROBLEMS_LIMIT_PER_PAGE - 1
         )
      })
   }

   getCodingProblemDetailsAPI() {
      return resolveWithTimeOut(codingProblemDetailsResponse)
   }
}

export { CodingProblemsFixture }
