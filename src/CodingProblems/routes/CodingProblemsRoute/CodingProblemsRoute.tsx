import React from 'react'
import { observer, inject } from 'mobx-react'

import { CreatingFlow } from '../../components/CreatingFlow'

type CodingProblemsRouteProps = {
   codingProblemsStore: any
}

@inject('codingProblemsStore')
@observer
class CodingProblemsRoute extends React.Component<CodingProblemsRouteProps> {
   onClickAttachFileButton = () => {}

   render() {
      const { codingProblemsStore } = this.props
      return <CreatingFlow codingProblemsStore={codingProblemsStore} />
   }
}

export { CodingProblemsRoute }
