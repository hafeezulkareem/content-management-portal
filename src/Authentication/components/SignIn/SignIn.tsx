import React, { ChangeEvent, FormEvent } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { API_FETCHING } from '@ib/api-constants'

import images from '../../../Common/themes/Images'
import commonI18n from '../../../Common/i18n/strings.json'

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

interface SignInProps {
   getUserAccessToken: (username: string, password: string) => void
   signInFailureError: string | null
   postSignInAPIStatus: number
}

@observer
class SignIn extends React.Component<SignInProps> {
   @observable username: string
   @observable password: string
   @observable usernameError: string | null
   @observable passwordError: string | null
   @observable usernameRef: React.RefObject<InputField>
   @observable passwordRef: React.RefObject<InputField>

   constructor(props) {
      super(props)
      this.username = ''
      this.password = ''
      this.usernameError = null
      this.passwordError = null
      this.usernameRef = React.createRef()
      this.passwordRef = React.createRef()
   }

   componentDidMount() {
      this.focusInputField(this.usernameRef)
   }

   focusInputField = (ref: React.RefObject<InputField>) => {
      const inputFieldRef = ref.current?.inputFieldRef
      inputFieldRef?.current?.focus()
   }

   onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
      this.username = event.target.value.trim()
      this.usernameError = null
   }

   onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
      this.password = event.target.value
      this.passwordError = null
   }

   onSubmitSignInForm = (event: FormEvent<HTMLFormElement>) => {
      const { getUserAccessToken } = this.props
      const { signInErrors } = i18n
      event.preventDefault()
      if (this.username === '' || this.username === undefined) {
         this.focusInputField(this.usernameRef)
         this.usernameError = signInErrors.pleasEnterUsername
      } else if (this.password === '' || this.password === undefined) {
         this.focusInputField(this.passwordRef)
         this.passwordError = signInErrors.pleaseEnterPassword
      } else {
         getUserAccessToken(this.username, this.password)
      }
   }

   render() {
      const { signInFailureError, postSignInAPIStatus } = this.props
      const { signUpMessages } = i18n
      const { imageAlts } = commonI18n
      return (
         <SignInPageWrapper>
            <SignInContainer>
               <SignInLogo alt={imageAlts.iBHubsLogo} src={images.ibHubsLogo} />
               <SignInTitle>{i18n.hiThereLogin}</SignInTitle>
               <SignInForm
                  onSubmit={this.onSubmitSignInForm}
                  autoComplete='off'
               >
                  <FieldWrapper>
                     <TextLabel htmlFor={i18n.username}>
                        {i18n.username}
                     </TextLabel>
                     <InputField
                        inputFieldValue={this.username}
                        onChangeInput={this.onChangeUsername}
                        inputFieldType='text'
                        error={this.usernameError}
                        id={i18n.username}
                        ref={this.usernameRef}
                     />
                     {this.usernameError && (
                        <ErrorMessage>{this.usernameError}</ErrorMessage>
                     )}
                  </FieldWrapper>
                  <FieldWrapper>
                     <TextLabel htmlFor={i18n.password}>
                        {i18n.password}
                     </TextLabel>
                     <InputField
                        inputFieldValue={this.password}
                        onChangeInput={this.onChangePassword}
                        inputFieldType='password'
                        error={this.passwordError}
                        id={i18n.password}
                        ref={this.passwordRef}
                     />
                     {this.passwordError && (
                        <ErrorMessage>{this.passwordError}</ErrorMessage>
                     )}
                  </FieldWrapper>
                  <SignInButton
                     disabled={postSignInAPIStatus === API_FETCHING}
                     isDisabled={postSignInAPIStatus === API_FETCHING}
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
