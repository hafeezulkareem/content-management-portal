import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Switch, Route, withRouter } from 'react-router-dom'
import { History } from 'history'

import { CreatingFlow } from '../../components/CreatingFlow'
import { CodingProblemsHome } from '../../components/CodingProblemsHome'
import { CODING_LIST } from '../../../Common/constants/SectionConstants'
import {
   CODING_PROBLEMS_PATH,
   SIGN_IN_PATH
} from '../../../Common/constants/RouteConstants'

import {
   CODING_PROBLEM_CREATE_PATH,
   CODING_PROBLEM_DETAILS_PATH
} from '../../constants/RouteConstants'

type CodingProblemsRouteProps = {
   authStore: any
   codingProblemsStore: any
   history: History
}

@inject('codingProblemsStore', 'authStore')
@observer
class CodingProblemsRoute extends React.Component<CodingProblemsRouteProps> {
   @observable activeSection: string = CODING_LIST

   userSignOut = () => {
      const {
         authStore: { userSignOut }
      } = this.props
      userSignOut()
      this.navigateToSignInPage()
   }

   navigateToSignInPage = () => {
      const { history } = this.props
      history.push(SIGN_IN_PATH)
   }

   navigateToCodingProblemsHome = () => {
      const { history } = this.props
      history.push(CODING_PROBLEMS_PATH)
   }

   navigateToCodingProblemCreatingFlow = () => {
      const { history } = this.props
      history.push(CODING_PROBLEM_CREATE_PATH)
   }

   navigateToCodingProblemDetailsPage = codingProblemId => {
      const { history } = this.props
      history.push(`${CODING_PROBLEMS_PATH}${codingProblemId}`)
   }

   render() {
      const { codingProblemsStore } = this.props
      return (
         <Switch>
            <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
               <CreatingFlow
                  onUserSignOut={this.userSignOut}
                  codingProblemsStore={codingProblemsStore}
                  navigateToCodingProblemsHome={
                     this.navigateToCodingProblemsHome
                  }
               />
            </Route>
            <Route exact path={CODING_PROBLEM_CREATE_PATH}>
               <CreatingFlow
                  onUserSignOut={this.userSignOut}
                  codingProblemsStore={codingProblemsStore}
                  navigateToCodingProblemsHome={
                     this.navigateToCodingProblemsHome
                  }
               />
            </Route>
            <Route exact path={CODING_PROBLEMS_PATH}>
               <CodingProblemsHome
                  onUserSignOut={this.userSignOut}
                  codingProblemsStore={codingProblemsStore}
                  activeSection={this.activeSection}
                  navigateToCodingProblemCreatingFlow={
                     this.navigateToCodingProblemCreatingFlow
                  }
                  navigateToCodingProblemDetailsPage={
                     this.navigateToCodingProblemDetailsPage
                  }
               />
            </Route>
         </Switch>
      )
   }
}

const CodingProblemsRouteWithRouter = withRouter(CodingProblemsRoute)

export { CodingProblemsRouteWithRouter }
