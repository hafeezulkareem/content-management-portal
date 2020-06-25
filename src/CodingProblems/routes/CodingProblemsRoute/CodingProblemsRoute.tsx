import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import {
   Switch,
   Route,
   withRouter,
   RouteComponentProps
} from 'react-router-dom'

import { CreatingFlow } from '../../components/CreatingFlow'
import { CodingProblemsHome } from '../../components/CodingProblemsHome'
import { CODING_LIST } from '../../../Common/constants/SectionConstants'
import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'

import { CODING_PROBLEM_DETAILS_PATH } from '../../constants/RouteConstants'
import {
   goToSignInPage,
   goToCodingProblemsHome,
   goToCodingProblemCreatingFlow,
   goToCodingProblemsDetailsPage
} from '../../utils/NavigationUtils'
import { CodingProblemsStore } from '../../stores/CodingProblemsStore'
import { AuthStore } from '../../../Authentication/stores/AuthStore'

interface CodingProblemsRouteProps extends RouteComponentProps {}

interface InjectedProps extends CodingProblemsRouteProps {
   authStore: AuthStore
   codingProblemsStore: CodingProblemsStore
}

@inject('codingProblemsStore', 'authStore')
@observer
class CodingProblemsRoute extends React.Component<CodingProblemsRouteProps> {
   @observable activeSection: string = CODING_LIST

   getInjectedProps = () => this.props as InjectedProps

   get codingProblemsStore() {
      return this.getInjectedProps().codingProblemsStore
   }

   get authStore() {
      return this.getInjectedProps().authStore
   }

   userSignOut = () => {
      const { userSignOut } = this.authStore
      userSignOut()
      this.navigateToSignInPage()
   }

   navigateToSignInPage = () => {
      const { history } = this.props
      goToSignInPage(history)
   }

   navigateToCodingProblemsHome = () => {
      const { history } = this.props
      goToCodingProblemsHome(history)
   }

   navigateToCodingProblemCreatingFlow = () => {
      const { history } = this.props
      goToCodingProblemCreatingFlow(history)
   }

   navigateToCodingProblemDetailsPage = (codingProblemId: number) => {
      const { history } = this.props
      goToCodingProblemsDetailsPage(history, codingProblemId)
   }

   render() {
      return (
         <Switch>
            <Route exact path={CODING_PROBLEM_DETAILS_PATH}>
               <CreatingFlow
                  onUserSignOut={this.userSignOut}
                  codingProblemsStore={this.codingProblemsStore}
                  navigateToCodingProblemsHome={
                     this.navigateToCodingProblemsHome
                  }
               />
            </Route>
            <Route exact path={CODING_PROBLEMS_PATH}>
               <CodingProblemsHome
                  onUserSignOut={this.userSignOut}
                  codingProblemsStore={this.codingProblemsStore}
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
