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
}

export { CodingProblemsAPI }
