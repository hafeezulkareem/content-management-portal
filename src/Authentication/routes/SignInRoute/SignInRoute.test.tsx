import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'

import {
   SIGN_IN_PATH,
   CODING_PROBLEMS_PATH
} from '../../../common/constants/RouteConstants'

import postUserSignInResponse from '../../fixtures/postUserSignInResponse.json'
import { AuthAPI } from '../../services/AuthServices/AuthAPI'
import { AuthStore } from '../../stores/AuthStore'
import {
   SIGN_BUTTON_TEST_ID,
   LOADING_VIEW_TEST_ID,
   INPUT_FIELD_TEST_ID
} from '../../constants/IdConstants'

import { SignInRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='coding-problems-page'>{location.pathname}</div>
))

const username = 'test-user'
const password = 'test-password'

describe('SignInRoute tests', () => {
   let authAPI, authStore

   beforeEach(() => {
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username empty error message', () => {
      const { getByText, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      fireEvent.click(signInButton)

      expect(getByText(/Please enter username/i)).toBeInTheDocument()
   })

   it('should render password empty error message', () => {
      const { getByText, getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const usernameField = getAllByTestId(INPUT_FIELD_TEST_ID)[0]
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(signInButton)

      expect(getByText(/Please enter password/i)).toBeInTheDocument()
   })

   it('should submit sign-in form on press enter', () => {
      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const [usernameField, passwordField] = getAllByTestId(INPUT_FIELD_TEST_ID)
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })

      waitFor(() => {
         expect(getByTestId(LOADING_VIEW_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should render SignIn loading state', () => {
      const { getAllByTestId, getByTestId, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const [usernameField, passwordField] = getAllByTestId(INPUT_FIELD_TEST_ID)
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.getLoginAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      expect(getByTestId(LOADING_VIEW_TEST_ID)).toBeInTheDocument()
      expect(getByRole('button', { disabled: true })).not.toBeNull()
   })

   it('should render SignIn failure state', () => {
      const { getAllByTestId, getByTestId, getByText } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const [usernameField, passwordField] = getAllByTestId(INPUT_FIELD_TEST_ID)
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('Invalid credentials'))
      }).catch(() => {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.postSignInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      waitFor(() => {
         expect(getByText(/invalid credentials/i)).toBeInTheDocument()
      })
   })

   it('should render SignIn success state', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      history.push(route)

      const { getAllByTestId, getByTestId, queryByRole } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>
               <Route path={CODING_PROBLEMS_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const [usernameField, passwordField] = getAllByTestId(INPUT_FIELD_TEST_ID)
      const signInButton = getByTestId(SIGN_BUTTON_TEST_ID)

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(postUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authAPI.postSignInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await waitFor(() => {
         expect(
            queryByRole('button', { name: 'LOGIN' })
         ).not.toBeInTheDocument()
         expect(getByTestId('coding-problems-page')).toHaveTextContent(
            CODING_PROBLEMS_PATH
         )
      })
   })

   it('should redirect to Coding Problems page if already logged in', async () => {
      const history = createMemoryHistory()
      history.push(SIGN_IN_PATH)

      const { getByTestId, queryByRole } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>
               <Route path={CODING_PROBLEMS_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(queryByRole('button', { name: 'LOGIN' })).toBe(null)
         expect(getByTestId('coding-problems-page')).toHaveTextContent(
            CODING_PROBLEMS_PATH
         )
      })
   })
})
