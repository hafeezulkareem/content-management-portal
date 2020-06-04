import React from 'react'
import { API_FETCHING } from '@ib/api-constants'
import { observer } from 'mobx-react'

import images from '../../../Common/themes/Images'
import commonI18n from '../../../Common/i18n/strings.json'

import i18n from '../../i18n/strings.json'
import { SIGN_BUTTON_TEST_ID } from '../../constants/IdConstants'

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
      const { signUpMessages } = i18n
      const { imageAlts } = commonI18n
      return (
         <SignInPageWrapper>
            <SignInContainer>
               <SignInLogo alt={imageAlts.iBHubsLogo} src={images.ibHubsLogo} />
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
                  <SignInButton
                     data-testid={SIGN_BUTTON_TEST_ID}
                     disabled={postSignInAPIStatus === API_FETCHING}
                  >
                     {postSignInAPIStatus !== API_FETCHING ? (
                        `${i18n.login.toUpperCase()}`
                     ) : (
                        <LoadingView />
                     )}
                  </SignInButton>
               </SignInForm>
               <SignUpMessage>
                  {signUpMessages.signInfo}{' '}
                  <SignUpLink href=''>{signUpMessages.signUp}</SignUpLink>
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
