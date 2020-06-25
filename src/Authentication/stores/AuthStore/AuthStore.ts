import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import { AuthService } from '../../services/AuthServices'

import { SignInResponse } from '../types'

class AuthStore {
   @observable postSignInAPIStatus!: APIStatus
   @observable postSignInAPIError!: string | null
   service: AuthService

   constructor(service: AuthService) {
      this.service = service
      this.init()
   }

   @action.bound
   init() {
      this.postSignInAPIStatus = API_INITIAL
      this.postSignInAPIError = null
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.clearStore()
   }

   @action.bound
   setSignInAPIStatus(signInAPIStatus: APIStatus) {
      this.postSignInAPIStatus = signInAPIStatus
   }

   @action.bound
   setSignInAPIResponse(signInAPIResponse: SignInResponse | null) {
      if (signInAPIResponse) {
         const { access_token: accessToken } = signInAPIResponse
         setAccessToken(accessToken)
      }
   }

   @action.bound
   setLoginAPIError(signInAPIError: Error | null) {
      this.postSignInAPIError = getUserDisplayableErrorMessage(signInAPIError)
   }

   @action.bound
   userSignIn(
      userDetails,
      onSuccessUserLogin,
      onFailureUserLogin
   ): Promise<SignInResponse | void> {
      const loginPromise = this.service.postSignInAPI(userDetails)
      return bindPromiseWithOnSuccess(loginPromise)
         .to(this.setSignInAPIStatus, response => {
            this.setSignInAPIResponse(response)
            onSuccessUserLogin()
         })
         .catch((error: Error | null) => {
            this.setLoginAPIError(error)
            onFailureUserLogin()
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export { AuthStore }
