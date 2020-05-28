import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { AppHeader } from '../../../common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../common/components/CodingAndMCQsNavigator'
import { CODING_LIST } from '../../../common/constants/SectionConstants'

import { CodingProblemsList } from '../CodingProblemsList'

import { AppContainer } from './styledComponents'

type CodingProblemsHomeProps = {
   codingProblemsStore: any
}

@observer
class CodingProblemsHome extends React.Component<CodingProblemsHomeProps> {
   @observable activeSection: string = CODING_LIST

   componentDidMount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.getCodingProblems()
   }

   render() {
      const { codingProblemsStore } = this.props
      const { codingProblemsList } = codingProblemsStore
      let codingProblemsListArray = Array.from(codingProblemsList.values())
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/696fd949-70d2-4be4-b1ef-a5065b1b1a11@3x.png'
            />
            <CodingAndMCQsNavigator activeSection={this.activeSection} />
            <CodingProblemsList codingProblemsList={codingProblemsListArray} />
         </AppContainer>
      )
   }
}

export { CodingProblemsHome }
