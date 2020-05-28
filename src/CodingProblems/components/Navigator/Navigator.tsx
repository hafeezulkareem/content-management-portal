import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'

import { NavigatorContainer, NavigationButton } from './styledComponents'

type NavigatorProps = {
   activeButton: string
   onClickTabButton: (string) => void
}

@observer
class Navigator extends React.Component<NavigatorProps> {
   onClickTabButton = newActiveTab => {
      const { onClickTabButton } = this.props
      onClickTabButton(newActiveTab)
   }

   render() {
      const {
         statement,
         roughSolution,
         testCases,
         prefilledCode,
         solutionApproach,
         cleanSolution,
         hints
      } = i18n.navigator
      const { activeButton } = this.props
      return (
         <NavigatorContainer>
            <NavigationButton
               onClick={() => this.onClickTabButton(statement)}
               isActive={activeButton === statement}
            >
               {statement}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(roughSolution)}
               isActive={activeButton === roughSolution}
            >
               {roughSolution}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(testCases)}
               isActive={activeButton === testCases}
            >
               {testCases}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(prefilledCode)}
               isActive={activeButton === prefilledCode}
            >
               {prefilledCode}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(solutionApproach)}
               isActive={activeButton === solutionApproach}
            >
               {solutionApproach}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(cleanSolution)}
               isActive={activeButton === cleanSolution}
            >
               {cleanSolution}
            </NavigationButton>
            <NavigationButton
               onClick={() => this.onClickTabButton(hints)}
               isActive={activeButton === hints}
            >
               {hints}
            </NavigationButton>
         </NavigatorContainer>
      )
   }
}

export { Navigator }
