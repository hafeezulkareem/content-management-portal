import { create } from 'apisauce'

import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods, BASE_URL } from '../../../Common/constants/APIConstants'

import { CODING_PROBLEMS_LIMIT_PER_PAGE } from '../../constants/APILimitConstants'

import { endpoints } from '../endpoints'

class CodingProblemsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   postProblemStatementAPI(statementData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         endpoints.statement,
         statementData,
         apiMethods.post
      )
   }

   postProblemRoughSolutionAPI(codingProblemId, roughSolutionsData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/rough_solutions/v1/`,
         roughSolutionsData,
         apiMethods.post
      )
   }

   deleteRoughSolutionAPI(codingProblemId, roughSolutionId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/rough_solutions/${roughSolutionId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   postProblemTestCaseAPI(codingProblemId, testCaseData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/test_cases/v1/`,
         testCaseData,
         apiMethods.post
      )
   }

   deleteTestCaseAPI(codingProblemId, testCaseId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/test_cases/${testCaseId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   postPrefilledCodeAPI(codingProblemId, preFilledData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/prefilled_codes/v1/`,
         preFilledData,
         apiMethods.post
      )
   }

   deletePrefilledCodeAPI(codingProblemId, prefilledCodeId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/prefilled_codes/${prefilledCodeId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   postSolutionApproachAPI(codingProblemId, solutionApproachData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/solution_approaches/v1/`,
         solutionApproachData,
         apiMethods.post
      )
   }

   postCleanSolutionAPI(codingProblemId, cleanSolutionData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/clean_solutions/v1/`,
         cleanSolutionData,
         apiMethods.post
      )
   }

   deleteCleanSolutionAPI(codingProblemId, cleanSolutionId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/clean_solutions/${cleanSolutionId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   postHintAPI(codingProblemId, hintData) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/hints/v1/`,
         hintData,
         apiMethods.post
      )
   }

   deleteHintAPI(codingProblemId, hintId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/hints/${hintId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   getCodingProblemsAPI(codingProblemsOffset) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `${endpoints.codingProblems}?offset=${codingProblemsOffset}&limit=${CODING_PROBLEMS_LIMIT_PER_PAGE}`,
         {},
         apiMethods.get
      )
   }

   getCodingProblemDetailsAPI(codingProblemId) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         `/coding_questions/${codingProblemId}/v1/`,
         {},
         apiMethods.get
      )
   }
}

export { CodingProblemsAPI }
