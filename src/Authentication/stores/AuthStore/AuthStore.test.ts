import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import Cookie from 'js-cookie'

import postUserSignInResponse from '../../fixtures/postUserSignInResponse.json'

import { AuthFixture } from '../../services/AuthServices/AuthFixture'

import { AuthStore } from '.'

const requestObject = {
   username: 'test-username',
   password: 'test-password'
}

describe('AuthStore tests', () => {
   let authAPI, authStore

   beforeEach(() => {
      authAPI = new AuthFixture()
      authStore = new AuthStore(authAPI)
   })

   it('should test initializing auth store', () => {
      expect(authStore.postSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.postSignInAPIError).toBe(null)
   })

   it('should test SignAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.postSignInAPI = mockSignInAPI

      authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.postSignInAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test userSignInAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(postUserSignInResponse)
      })
      const mockSetCookie = jest.fn()
      Cookie.set = mockSetCookie

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authAPI.postSignInAPI = mockSignInAPI

      await authStore.userSignIn(requestObject, onSuccess, onFailure)

      expect(authStore.postSignInAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSuccess).toBeCalled()
   })

   it('should test SignInAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.postSignInAPI = mockSignInAPI

      authStore = new AuthStore(authAPI)
      await authStore.userSignIn(requestObject, onSuccess, onFailure)

      expect(authStore.postSignInAPIStatus).toBe(API_FAILED)
      expect(authStore.postSignInAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test user sign-out', () => {
      const mockRemoveCookie = jest.fn()
      Cookie.remove = mockRemoveCookie

      authStore.userSignOut()

      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.postSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.postSignInAPIError).toBe(null)
   })
})
