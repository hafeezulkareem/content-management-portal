import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

class AuthStore {
   @observable postSignInAPIStatus
   @observable postSignInAPIError
   service

   constructor(service) {
      this.service = service
      this.init()
   }

   @action.bound
   init() {
      this.postSignInAPIStatus = API_INITIAL
      this.postSignInAPIError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setSignInAPIStatus(signInAPIStatus) {
      this.postSignInAPIStatus = signInAPIStatus
   }

   @action.bound
   setLoginAPIError(signInAPIError) {
      this.postSignInAPIError = getUserDisplayableErrorMessage(signInAPIError)
   }

   @action.bound
   setSignInAPIResponse(signInAPIResponse) {
      const { access_token: accessToken } = signInAPIResponse
      setAccessToken(accessToken)
   }

   @action.bound
   userSignIn(userDetails, onSuccessUserLogin, onFailureUserLogin) {
      const loginPromise = this.service.postSignInAPI(userDetails)
      return bindPromiseWithOnSuccess(loginPromise)
         .to(this.setSignInAPIStatus, response => {
            this.setSignInAPIResponse(response)
            onSuccessUserLogin()
         })
         .catch(error => {
            this.setLoginAPIError(error)
            onFailureUserLogin()
         })
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.clearStore()
   }
}

export { AuthStore }
