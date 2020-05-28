import React from 'react'
import { observer } from 'mobx-react'

import { AppHeader } from '../../../common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../common/components/CodingAndMCQsNavigator'
import { CODING_LIST } from '../../../common/constants/SectionConstants'

import { AppContainer } from './styledComponents'
import { observable } from 'mobx'

@observer
class CodingProblemsHome extends React.Component {
   @observable activeSection: string = CODING_LIST

   render() {
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/696fd949-70d2-4be4-b1ef-a5065b1b1a11@3x.png'
            />
            <CodingAndMCQsNavigator activeSection={this.activeSection} />
         </AppContainer>
      )
   }
}

export { CodingProblemsHome }
