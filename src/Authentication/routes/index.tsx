import React from 'react'
import { Route } from 'react-router-dom'

import { SIGN_IN_PATH } from '../../Common/constants/RouteConstants'

import { SignInRoute } from './SignInRoute'

const routes = [
   <Route
      exact
      path={SIGN_IN_PATH}
      component={SignInRoute}
      key={SIGN_IN_PATH}
   />
]

export { routes }
