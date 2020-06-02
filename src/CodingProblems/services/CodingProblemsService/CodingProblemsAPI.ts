import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class CodingProblemsAPI {
   api

   constructor() {
      this.api = create({
         baseURL: ''
      })
   }

   postProblemStatementAPI(statementData) {
      return networkCallWithApisauce(
         this.api,
         '',
         statementData,
         apiMethods.post
      )
   }

   postProblemRoughSolutionAPI(roughSolutionsData) {
      return networkCallWithApisauce(
         this.api,
         '',
         roughSolutionsData,
         apiMethods.post
      )
   }

   deleteRoughSolutionAPI(codingProblemId, roughSolutionId) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.delete)
   }

   postProblemTestCaseAPI(testCaseData) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.post)
   }

   deleteTestCaseAPI(testCaseId) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.delete)
   }

   postSolutionApproachAPI(solutionApproachData) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.post)
   }

   getCodingProblemsAPI(codingProblemsOffset) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }

   getCodingProblemDetailsAPI(codingProblemId) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }
}

export { CodingProblemsAPI }
