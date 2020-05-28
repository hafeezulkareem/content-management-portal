import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { SIGN_IN_PATH } from '../../constants/RouteConstants'
import { isSignedIn } from '../../utils/SignInUtils'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
   if (isSignedIn()) {
      return <Route exact path={rest.path} component={Component} />
   } else {
      return <Redirect to={SIGN_IN_PATH} />
   }
}
