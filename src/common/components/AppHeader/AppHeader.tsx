import React from 'react'

import images from '../../themes/Images'

import {
   AppHeaderContainer,
   CompanyLogo,
   UserProfilePic
} from './styledComponents'

type AppHeaderProps = {
   userProfilePicLink: string
   username: string
}

class AppHeader extends React.Component<AppHeaderProps> {
   render() {
      const { userProfilePicLink, username } = this.props
      return (
         <AppHeaderContainer>
            <CompanyLogo alt='iB Hubs Logo' src={images.ibHubsHorizontalLogo} />
            <UserProfilePic
               alt={`${username} Profile Pic`}
               src={userProfilePicLink}
            />
         </AppHeaderContainer>
      )
   }
}

export { AppHeader }
