import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { SignIn } from './SignIn'

const testUsername = 'test-user'
const testPassword = 'test-password'

describe('SignIn Tests', () => {
   it('should render labels for two fields', () => {
      const { getByText } = render(
         <SignIn
            getUserAccessToken={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/username/i)).toBeInTheDocument()
      expect(getByText(/password/i)).toBeInTheDocument()
   })

   it('should render given username & password', () => {
      const { getByLabelText } = render(
         <SignIn
            getUserAccessToken={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      const usernameInputField = getByLabelText('USERNAME') as HTMLInputElement
      const passwordInputField = getByLabelText('PASSWORD') as HTMLInputElement

      fireEvent.change(usernameInputField, { target: { value: testUsername } })
      fireEvent.change(passwordInputField, { target: { value: testPassword } })

      expect(usernameInputField.value).toBe(testUsername)
      expect(passwordInputField.value).toBe(testPassword)
   })

   it('should render username error', () => {
      const { getByText, getByRole } = render(
         <SignIn
            getUserAccessToken={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      const signInButton = getByRole('button', { name: 'LOGIN' })

      fireEvent.click(signInButton)

      expect(getByText(/please enter username/i)).toBeInTheDocument()
   })

   it('should render password error', () => {
      const { getByText, getByLabelText, getByRole } = render(
         <SignIn
            getUserAccessToken={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      const usernameInputField = getByLabelText('USERNAME')
      const signInButton = getByRole('button', { name: 'LOGIN' })

      fireEvent.change(usernameInputField, { target: { value: testUsername } })
      fireEvent.click(signInButton)

      expect(getByText(/please enter password/i)).toBeInTheDocument()
   })

   it('should render signInFailureError', () => {
      const { getByText } = render(
         <SignIn
            getUserAccessToken={() => {}}
            signInFailureError={'Something went wrong!'}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/something went wrong/i)).toBeInTheDocument()
   })
})
