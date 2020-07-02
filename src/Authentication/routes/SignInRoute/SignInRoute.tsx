import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'

import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'
import { isSignedIn } from '../../../Common/utils/SignInUtils'

import { SignIn } from '../../components/SignIn'
import { AuthStore } from '../../stores/AuthStore'

interface SignInRouteProps extends RouteComponentProps {}

interface InjectedProps extends SignInRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SignInRoute extends React.Component<SignInRouteProps> {
   @observable signInFailureError: string | null

   constructor(props: SignInRouteProps) {
      super(props)
      this.signInFailureError = null
   }

   getInjectedProps = () => this.props as InjectedProps

   get authStore() {
      return this.getInjectedProps().authStore
   }

   onSuccessUserSignIn = () => {
      const { history } = this.props
      history.push(CODING_PROBLEMS_PATH)
   }

   onFailureUserSingIn = () => {
      this.signInFailureError = this.authStore.postSignInAPIError
   }

   getUserAccessToken = (username: string, password: string) => {
      this.authStore.userSignIn(
         { username, password },
         this.onSuccessUserSignIn,
         this.onFailureUserSingIn
      )
   }

   render() {
      const { postSignInAPIStatus } = this.authStore
      if (isSignedIn()) {
         return <Redirect to={CODING_PROBLEMS_PATH} />
      }
      return (
         <SignIn
            getUserAccessToken={this.getUserAccessToken}
            signInFailureError={this.signInFailureError}
            postSignInAPIStatus={postSignInAPIStatus}
         />
      )
   }
}

export default withRouter(SignInRoute)
