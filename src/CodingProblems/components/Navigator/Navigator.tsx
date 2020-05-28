import React from 'react'
import { observer } from 'mobx-react'

import { NavigatorContainer, NavigationButton } from './styledComponents'

type NavigatorProps = {
   tabDetails: Array<any>
   onSelectTab: (string) => void
}

@observer
class Navigator extends React.Component<NavigatorProps> {
   onSelectTab = tabIndex => {
      const { onSelectTab } = this.props
      onSelectTab(tabIndex)
   }

   renderTabs = () => {
      const { tabDetails } = this.props
      return tabDetails.map(tab => (
         <NavigationButton
            key={tab.tabIndex}
            isActive={tab.isSelected}
            onClick={() => this.onSelectTab(tab.tabIndex)}
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
