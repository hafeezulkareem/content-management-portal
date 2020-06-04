import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods, BASE_URL } from '../../../Common/constants/APIConstants'

import { endpoints } from '../endpoints'

class AuthAPI {
   api

   constructor() {
      this.api = create({
         baseURL: BASE_URL
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
