import React from 'react'
import { render } from '@testing-library/react'

import { INPUT_FIELD_TEST_ID } from '../../constants/IdConstants'

import { SignIn } from './SignIn'

const testUsername = 'test-user'
const testPassword = 'test-password'

describe('SignIn Tests', () => {
   it('should render labels for two fields', () => {
      const { getByText } = render(
         <SignIn
            username=''
            password=''
            usernameError={null}
            passwordError={null}
            onChangeUsername={() => {}}
            onChangePassword={() => {}}
            onSubmitSignInForm={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/username/i)).toBeInTheDocument()
      expect(getByText(/password/i)).toBeInTheDocument()
   })

   it('should render given username & password', () => {
      const { getAllByTestId } = render(
         <SignIn
            username={testUsername}
            password={testPassword}
            usernameError={null}
            passwordError={null}
            onChangeUsername={() => {}}
            onChangePassword={() => {}}
            onSubmitSignInForm={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      const inputFields = getAllByTestId(INPUT_FIELD_TEST_ID) as Array<
         HTMLInputElement
      >

      expect(inputFields[0].value).toBe(testUsername)
      expect(inputFields[1].value).toBe(testPassword)
   })

   it('should render username error', () => {
      const { getByText } = render(
         <SignIn
            username={testUsername}
            password={testPassword}
            usernameError={'Please fill the username'}
            passwordError={null}
            onChangeUsername={() => {}}
            onChangePassword={() => {}}
            onSubmitSignInForm={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/please fill the username/i)).toBeInTheDocument()
   })

   it('should render password error', () => {
      const { getByText } = render(
         <SignIn
            username={testUsername}
            password={testPassword}
            usernameError={null}
            passwordError={'Please fill the password'}
            onChangeUsername={() => {}}
            onChangePassword={() => {}}
            onSubmitSignInForm={() => {}}
            signInFailureError={null}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/please fill the password/i)).toBeInTheDocument()
   })

   it('should render signInFailureError', () => {
      const { getByText } = render(
         <SignIn
            username={testUsername}
            password={testPassword}
            usernameError={null}
            passwordError={null}
            onChangeUsername={() => {}}
            onChangePassword={() => {}}
            onSubmitSignInForm={() => {}}
            signInFailureError={'Something went wrong!'}
            postSignInAPIStatus={0}
         />
      )

      expect(getByText(/something went wrong/i)).toBeInTheDocument()
   })
})
