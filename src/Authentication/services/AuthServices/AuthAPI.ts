import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { signInAPIConstants } from '../../constants/SignInAPIConstants'

import { endpoints } from '../endpoints'

class AuthAPI {
   api

   constructor() {
      this.api = create({
         baseURL: signInAPIConstants.BASE_URL
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
