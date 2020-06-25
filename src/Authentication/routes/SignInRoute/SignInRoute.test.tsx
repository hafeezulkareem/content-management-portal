import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'

import {
   SIGN_IN_PATH,
   CODING_PROBLEMS_PATH
} from '../../../Common/constants/RouteConstants'

import postUserSignInResponse from '../../fixtures/postUserSignInResponse.json'
import { AuthFixture } from '../../services/AuthServices/AuthFixture'
import { AuthStore } from '../../stores/AuthStore'
import { AuthService } from '../../services/AuthServices'
import { LOADING_VIEW_TEST_ID } from '../../constants/IdConstants'

import { SignInRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='coding-problems-page'>{location.pathname}</div>
))

const username = 'test-user'
const password = 'test-password'

describe('SignInRoute tests', () => {
   let authAPI: AuthService, authStore: AuthStore

   beforeEach(() => {
      authAPI = new AuthFixture()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should submit sign-in form on press enter', () => {
      const { getByLabelText, getByRole, getByTestId } = render(
         <Provider authStore={authStore}>
            <Router history={createMemoryHistory()}>
               <SignInRoute />
            </Router>
         </Provider>
      )

      const [usernameField, passwordField] = [
         getByLabelText('USERNAME') as HTMLInputElement,
         getByLabelText('PASSWORD') as HTMLInputElement
      ]
      const signInButton = getByRole('button', { name: 'LOGIN' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })

      waitFor(() => {
         expect(getByTestId(LOADING_VIEW_TEST_ID)).toBeInTheDocument()
      })
   })

   it('should render SignIn loading state', () => {
      const { getByLabelText, getByTestId, getByRole } = render(
         <Provider authStore={authStore}>
            <Router history={createMemoryHistory()}>
               <SignInRoute />
            </Router>
         </Provider>
      )

      const [usernameField, passwordField] = [
         getByLabelText('USERNAME') as HTMLInputElement,
         getByLabelText('PASSWORD') as HTMLInputElement
      ]
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockLoadingPromise = new Promise(function() {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.postSignInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      expect(getByTestId(LOADING_VIEW_TEST_ID)).toBeInTheDocument()
      expect(getByRole('button', { disabled: true })).not.toBeNull()
   })

   it('should render SignIn failure state', () => {
      const { getByLabelText, getByText, getByRole } = render(
         <Provider authStore={authStore}>
            <Router history={createMemoryHistory()}>
               <SignInRoute />
            </Router>
         </Provider>
      )

      const [usernameField, passwordField] = [
         getByLabelText('USERNAME') as HTMLInputElement,
         getByLabelText('PASSWORD') as HTMLInputElement
      ]
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockFailurePromise = new Promise(function(_, reject) {
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

      const { getByLabelText, getByTestId, getByRole, queryByRole } = render(
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

      const [usernameField, passwordField] = [
         getByLabelText('USERNAME') as HTMLInputElement,
         getByLabelText('PASSWORD') as HTMLInputElement
      ]
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockSuccessPromise = new Promise(function(resolve) {
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
