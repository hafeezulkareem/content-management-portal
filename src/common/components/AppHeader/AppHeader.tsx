import React from 'react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import {
   AppHeaderContainer,
   CompanyLogo,
   UserProfilePic,
   SignOutButton,
   UserProfileAndSignOutButton
} from './styledComponents'

type AppHeaderProps = {
   userProfilePicLink: string
   username: string
   onClickSignOut: any
}

class AppHeader extends React.Component<AppHeaderProps> {
   render() {
      const { userProfilePicLink, username, onClickSignOut } = this.props
      const { imageAlts } = i18n
      return (
         <AppHeaderContainer>
            <CompanyLogo
               alt={imageAlts.iBHubsLogo}
               src={images.ibHubsHorizontalLogo}
            />
            <UserProfileAndSignOutButton>
               <UserProfilePic
                  alt={`${username} ${imageAlts.profilePic}`}
                  src={userProfilePicLink}
               />
               <SignOutButton onClick={onClickSignOut}>
                  {i18n.signOut}
               </SignOutButton>
            </UserProfileAndSignOutButton>
         </AppHeaderContainer>
      )
   }
}

export { AppHeader }
