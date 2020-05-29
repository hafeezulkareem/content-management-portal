import React from 'react'
import { API_FETCHING } from '@ib/api-constants'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'

import { InputField } from '../InputField'
import { LoadingView } from '../LoadingView'

import {
   SignInContainer,
   SignInLogo,
   SignInTitle,
   FieldWrapper,
   TextLabel,
   ErrorMessage,
   SignInButton,
   SignInPageWrapper,
   SignUpMessage,
   SignUpLink,
   SignInForm,
   SignInErrorMessage
} from './styledComponents'

type SignInProps = {
   username: string
   password: string
   usernameError: string | null
   passwordError: string | null
   onChangeUsername: (any) => void
   onChangePassword: (any) => void
   onSubmitSignInForm: (any) => void
   signInFailureError: string | null
   postSignInAPIStatus: number
}

@observer
class SignIn extends React.Component<SignInProps> {
   render() {
      const {
         username,
         password,
         usernameError,
         passwordError,
         onChangeUsername,
         onChangePassword,
         onSubmitSignInForm,
         signInFailureError,
         postSignInAPIStatus
      } = this.props
      return (
         <SignInPageWrapper>
            <SignInContainer>
               <SignInLogo
                  alt='iB Hubs Logo'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7e21de62-6f31-4279-a660-2abefaa00993.svg'
               />
               <SignInTitle>Hi there, login</SignInTitle>
               <SignInForm onSubmit={onSubmitSignInForm}>
                  <FieldWrapper>
                     <TextLabel>{i18n.username}</TextLabel>
                     <InputField
                        inputFieldValue={username}
                        onChangeInput={onChangeUsername}
                        inputFieldType='text'
                        error={usernameError}
                     />
                     {usernameError && (
                        <ErrorMessage>{usernameError}</ErrorMessage>
                     )}
                  </FieldWrapper>
                  <FieldWrapper>
                     <TextLabel>{i18n.password}</TextLabel>
                     <InputField
                        inputFieldValue={password}
                        onChangeInput={onChangePassword}
                        inputFieldType='password'
                        error={passwordError}
                     />
                     {passwordError && (
                        <ErrorMessage>{passwordError}</ErrorMessage>
                     )}
                  </FieldWrapper>
                  <SignInButton disabled={postSignInAPIStatus === API_FETCHING}>
                     {postSignInAPIStatus !== API_FETCHING ? (
                        `${i18n.login.toUpperCase()}`
                     ) : (
                        <LoadingView />
                     )}
                  </SignInButton>
               </SignInForm>
               <SignUpMessage>
                  Don't have an account? <SignUpLink href=''>Signup</SignUpLink>
               </SignUpMessage>
               {signInFailureError && (
                  <SignInErrorMessage>{signInFailureError}</SignInErrorMessage>
               )}
            </SignInContainer>
         </SignInPageWrapper>
      )
   }
}

export { SignIn }
