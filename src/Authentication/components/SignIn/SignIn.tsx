import React from 'react'

import i18n from '../../i18n/strings.json'

import { InputField } from '../InputField'

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
   SignUpLink
} from './styledComponents'

class SignIn extends React.Component {
   render() {
      return (
         <SignInPageWrapper>
            <SignInContainer>
               <SignInLogo
                  alt='iB Hubs Logo'
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7e21de62-6f31-4279-a660-2abefaa00993.svg'
               />
               <SignInTitle>Hi there, login</SignInTitle>
               <FieldWrapper>
                  <TextLabel>{i18n.username}</TextLabel>
                  <InputField
                     inputFieldType='text'
                     onChangeInput={() => {}}
                     inputFieldValue=''
                     isError={false}
                  />
               </FieldWrapper>
               <FieldWrapper>
                  <TextLabel>{i18n.password}</TextLabel>
                  <InputField
                     inputFieldType='password'
                     onChangeInput={() => {}}
                     inputFieldValue=''
                     isError={true}
                  />
                  <ErrorMessage>Incorrect password</ErrorMessage>
               </FieldWrapper>
               <SignInButton>{i18n.login.toUpperCase()}</SignInButton>
               <SignUpMessage>
                  Don't have an account? <SignUpLink href=''>Signup</SignUpLink>
               </SignUpMessage>
            </SignInContainer>
         </SignInPageWrapper>
      )
   }
}

export { SignIn }
