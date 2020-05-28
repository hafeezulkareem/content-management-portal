import React from 'react'

import { ProtectedRoute } from '../../common/components/ProtectedRoute/ProtectedRoute'
import { CODING_PROBLEMS_PATH } from '../../common/constants/RouteConstants'

import { CodingProblemsRoute } from './CodingProblemsRoute'

const routes = [
   <ProtectedRoute
      component={CodingProblemsRoute}
      path={CODING_PROBLEMS_PATH}
      key={CODING_PROBLEMS_PATH}
   />
]

export { routes }
