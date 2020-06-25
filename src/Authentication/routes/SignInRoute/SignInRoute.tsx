import React, { ChangeEvent, FormEvent } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'

import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'
import { isSignedIn } from '../../../Common/utils/SignInUtils'

import { SignIn } from '../../components/SignIn'
import i18n from '../../i18n/strings.json'
import { AuthStore } from '../../stores/AuthStore'

interface SignInRouteProps extends RouteComponentProps {}

interface InjectedProps extends SignInRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SignInRoute extends React.Component<SignInRouteProps> {
   @observable username: string
   @observable password: string
   @observable usernameError: string | null
   @observable passwordError: string | null
   @observable signInFailureError: string | null

   constructor(props: SignInRouteProps) {
      super(props)
      this.username = ''
      this.password = ''
      this.usernameError = null
      this.passwordError = null
      this.signInFailureError = null
   }

   getInjectedProps = () => this.props as InjectedProps

   get authStore() {
      return this.getInjectedProps().authStore
   }

   onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
      this.username = event.target.value.trim()
      this.usernameError = null
   }

   onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
      this.password = event.target.value.trim()
      this.passwordError = null
   }

   onSuccessUserSignIn = () => {
      const { history } = this.props
      history.push(CODING_PROBLEMS_PATH)
   }

   onFailureUserSingIn = () => {
      this.signInFailureError = this.authStore.postSignInAPIError
   }

   getUserAccessToken = () => {
      this.authStore.userSignIn(
         { username: this.username, password: this.password },
         this.onSuccessUserSignIn,
         this.onFailureUserSingIn
      )
   }

   onSubmitSignInForm = (event: FormEvent<HTMLFormElement>) => {
      const { signInErrors } = i18n
      event.preventDefault()
      if (this.username === '' || this.username === undefined) {
         this.usernameError = signInErrors.pleasEnterUsername
      } else if (this.password === '' || this.password === undefined) {
         this.passwordError = signInErrors.pleaseEnterPassword
      } else {
         this.getUserAccessToken()
      }
   }

   render() {
      const { postSignInAPIStatus } = this.authStore
      if (isSignedIn()) {
         return <Redirect to={CODING_PROBLEMS_PATH} />
      }
      return (
         <SignIn
            username={this.username}
            password={this.password}
            usernameError={this.usernameError}
            passwordError={this.passwordError}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            onSubmitSignInForm={this.onSubmitSignInForm}
            signInFailureError={this.signInFailureError}
            postSignInAPIStatus={postSignInAPIStatus}
         />
      )
   }
}

const SignInRouteWithRouter = withRouter(SignInRoute)

export { SignInRouteWithRouter }
