import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Switch, Route } from 'react-router-dom'

import { CreatingFlow } from '../../components/CreatingFlow'
import { CodingProblemsHome } from '../../components/CodingProblemsHome'
import { CODING_LIST } from '../../../common/constants/SectionConstants'
import { CODING_PROBLEMS_PATH } from '../../../common/constants/RouteConstants'

import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'

type CodingProblemsRouteProps = {
   codingProblemsStore: any
}

@inject('codingProblemsStore')
@observer
class CodingProblemsRoute extends React.Component<CodingProblemsRouteProps> {
   @observable activeSection: string = CODING_LIST

   onClickAttachFileButton = () => {}

   render() {
      const { codingProblemsStore } = this.props
      // return <CreatingFlow codingProblemsStore={codingProblemsStore} />
      return (
         <Switch>
            <Route exact path={CODING_PROBLEM_CREATE_PATH}>
               <CreatingFlow codingProblemsStore={codingProblemsStore} />
            </Route>
            <Route exact path={CODING_PROBLEMS_PATH}>
               <CodingProblemsHome
                  codingProblemsStore={codingProblemsStore}
                  activeSection={this.activeSection}
               />
            </Route>
         </Switch>
      )
   }
}

export { CodingProblemsRoute }
