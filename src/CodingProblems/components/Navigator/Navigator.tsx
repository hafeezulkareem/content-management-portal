import React from 'react'
import { observer } from 'mobx-react'

import { NavigatorContainer, NavigationButton } from './styledComponents'

interface NavigatorProps {
   tabDetails: Array<{ tabIndex: number; tabName: string; isSelected: boolean }>
   onSelectTab: (tabNumber: number) => void
   areButtonsDisabled: boolean
}

@observer
class Navigator extends React.Component<NavigatorProps> {
   onSelectTab = (tabIndex: number) => {
      const { onSelectTab } = this.props
      onSelectTab(tabIndex)
   }

   renderTabs = () => {
      const { tabDetails, areButtonsDisabled } = this.props
      return tabDetails.map(tab => (
         <NavigationButton
            data-testid={tab.tabName}
            key={tab.tabIndex}
            isActive={tab.isSelected}
            onClick={() => this.onSelectTab(tab.tabIndex)}
            disabled={areButtonsDisabled}
            isDisabled={areButtonsDisabled}
         >
            {tab.tabName.split('_').join(' ')}
         </NavigationButton>
      ))
   }

   render() {
      return <NavigatorContainer>{this.renderTabs()}</NavigatorContainer>
   }
}

export { Navigator }
