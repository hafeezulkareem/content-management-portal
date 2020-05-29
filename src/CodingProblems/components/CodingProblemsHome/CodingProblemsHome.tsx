import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'

import { AppHeader } from '../../../common/components/AppHeader'
import { CodingAndMCQsNavigator } from '../../../common/components/CodingAndMCQsNavigator'
import { FooterNavigation } from '../../../common/components/FooterNavigation'
import { SelectList } from '../../../common/components/SelectList'

import i18n from '../../i18n/strings.json'
import { CODING_PROBLEM_CREATE_PATH } from '../../constants/RouteConstants'

import { CodingProblemsList } from '../CodingProblemsList'

import { AppContainer } from './styledComponents'

type CodingProblemsHomeProps = {
   codingProblemsStore: any
   activeSection: string
   history: History
}

@observer
class CodingProblemsHome extends React.Component<CodingProblemsHomeProps> {
   componentDidMount() {
      const { codingProblemsStore } = this.props
      codingProblemsStore.getCodingProblems()
   }

   goToCodingProblemCreatingFlow = () => {
      const { history } = this.props
      history.push(CODING_PROBLEM_CREATE_PATH)
   }

   render() {
      const { codingProblemsStore, activeSection } = this.props
      const { codingProblemsList } = codingProblemsStore
      let codingProblemsListArray = Array.from(codingProblemsList.values())
      const { addCodingQuestions } = i18n as any
      return (
         <AppContainer>
            <AppHeader
               username='Chi Lee'
               userProfilePicLink='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/696fd949-70d2-4be4-b1ef-a5065b1b1a11@3x.png'
            />
            <CodingAndMCQsNavigator activeSection={activeSection} />
            <SelectList isSelected={false} onSelect={() => {}} />
            <CodingProblemsList codingProblemsList={codingProblemsListArray} />
            <FooterNavigation
               buttonText={addCodingQuestions}
               onClickAddButton={this.goToCodingProblemCreatingFlow}
            />
         </AppContainer>
      )
   }
}

const CodingProblemsHomeWithRouter = withRouter(CodingProblemsHome)

export { CodingProblemsHomeWithRouter }
