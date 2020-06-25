import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods, BASE_URL } from '../../../Common/constants/APIConstants'

import { endpoints } from '../endpoints'

import { AuthService } from '.'

class AuthAPI implements AuthService {
   api: Record<string, any>

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
