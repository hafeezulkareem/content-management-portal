import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { History } from 'history'

import { CODING_PROBLEMS_PATH } from '../../../common/constants/RouteConstants'
import { isSignedIn } from '../../../common/utils/SignInUtils'

import { SignIn } from '../../components/SignIn'
import i18n from '../../i18n/strings.json'

type SignInRouteProps = {
   authStore: any
   history: History
}

@inject('authStore')
@observer
class SignInRoute extends React.Component<SignInRouteProps> {
   @observable username: string
   @observable password: string
   @observable usernameError: string | null
   @observable passwordError: string | null
   @observable signInFailureError: string | null

   constructor(props) {
      super(props)
      this.username = ''
      this.password = ''
      this.usernameError = null
      this.passwordError = null
      this.signInFailureError = null
   }

   onChangeUsername = event => {
      this.username = event.target.value.trim()
      this.usernameError = null
   }

   onChangePassword = event => {
      this.password = event.target.value.trim()
      this.passwordError = null
   }

   onSuccessUserSignIn = () => {
      const { history } = this.props
      history.push(CODING_PROBLEMS_PATH)
   }

   onFailureUserSingIn = () => {
      const { signInErrors } = i18n
      this.signInFailureError = signInErrors.somethingWentWrong
   }

   getUserAccessToken = () => {
      const { authStore } = this.props
      authStore.userSignIn(
         { username: this.username, password: this.password },
         this.onSuccessUserSignIn,
         this.onFailureUserSingIn
      )
   }

   onSubmitSignInForm = event => {
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
      const { authStore } = this.props
      const { postSignInAPIStatus } = authStore
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
