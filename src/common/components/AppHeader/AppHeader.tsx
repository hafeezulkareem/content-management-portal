import React from 'react'

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
            <CompanyLogo
               alt='iB Hubs Logo'
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/46eea337-9a5d-46c7-95cb-95afaac86764.svg'
            />
            <UserProfilePic
               alt={`${username} Profile Pic`}
               src={userProfilePicLink}
            />
         </AppHeaderContainer>
      )
   }
}

export { AppHeader }
