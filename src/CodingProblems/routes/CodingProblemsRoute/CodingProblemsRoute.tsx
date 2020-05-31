import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Switch, Route, withRouter } from 'react-router-dom'
import { History } from 'history'

import { CreatingFlow } from '../../components/CreatingFlow'
import { CodingProblemsHome } from '../../components/CodingProblemsHome'
import { CODING_LIST } from '../../../Common/constants/SectionConstants'
import { CODING_PROBLEMS_PATH } from '../../../Common/constants/RouteConstants'

import {
   CODING_PROBLEM_CREATE_PATH,
   CODING_PROBLEM_DETAILS_PATH
} from '../../constants/RouteConstants'

type CodingProblemsRouteProps = {
   codingProblemsStore: any
   history: History
}

@inject('codingProblemsStore')
@observer
class CodingProblemsRoute extends React.Component<CodingProblemsRouteProps> {
   @observable activeSection: string = CODING_LIST

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
                  codingProblemsStore={codingProblemsStore}
                  navigateToCodingProblemsHome={
                     this.navigateToCodingProblemsHome
                  }
               />
            </Route>
            <Route exact path={CODING_PROBLEM_CREATE_PATH}>
               <CreatingFlow
                  codingProblemsStore={codingProblemsStore}
                  navigateToCodingProblemsHome={
                     this.navigateToCodingProblemsHome
                  }
               />
            </Route>
            <Route exact path={CODING_PROBLEMS_PATH}>
               <CodingProblemsHome
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
