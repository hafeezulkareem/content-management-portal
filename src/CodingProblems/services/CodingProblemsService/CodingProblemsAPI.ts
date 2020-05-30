import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../common/utils/APIUtils'
import { apiMethods } from '../../../common/constants/APIConstants'

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

   getCodingProblemsAPI() {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }

   getCodingProblemDetailsAPI(codingProblemId) {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }
}

export { CodingProblemsAPI }
