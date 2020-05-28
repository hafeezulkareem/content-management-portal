import React from 'react'
import { observer } from 'mobx-react'

import { CreatingFlow } from '../../components/CreatingFlow'

@observer
class CodingProblemsRoute extends React.Component {
   onClickAttachFileButton = () => {}

   render() {
      return <CreatingFlow />
   }
}

export { CodingProblemsRoute }
