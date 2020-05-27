import React from 'react'

import i18n from '../../i18n/strings.json'

import { NavigatorContainer, NavigationButton } from './styledComponents'

type NavigatorProps = {
   activeButton: string
}

class Navigator extends React.Component<NavigatorProps> {
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
            <NavigationButton isActive={activeButton === statement}>
               {statement}
            </NavigationButton>
            <NavigationButton isActive={activeButton === roughSolution}>
               {roughSolution}
            </NavigationButton>
            <NavigationButton isActive={activeButton === testCases}>
               {testCases}
            </NavigationButton>
            <NavigationButton isActive={activeButton === prefilledCode}>
               {prefilledCode}
            </NavigationButton>
            <NavigationButton isActive={activeButton === solutionApproach}>
               {solutionApproach}
            </NavigationButton>
            <NavigationButton isActive={activeButton === cleanSolution}>
               {cleanSolution}
            </NavigationButton>
            <NavigationButton isActive={activeButton === hints}>
               {hints}
            </NavigationButton>
         </NavigatorContainer>
      )
   }
}

export { Navigator }
