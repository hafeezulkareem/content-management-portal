import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../common/utils/APIUtils'
import { apiMethods } from '../../../common/constants/APIConstants'

import { endpoints } from '../endpoints'

class AuthAPI {
   api

   constructor() {
      this.api = create({
         baseURL: ''
      })
   }

   postSignInAPI(userDetails) {
      return networkCallWithApisauce(
         this.api,
         endpoints.signIn,
         userDetails,
         apiMethods.post
      )
   }
}

export { AuthAPI }
