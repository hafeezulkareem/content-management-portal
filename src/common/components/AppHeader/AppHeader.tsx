import React from 'react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import {
   AppHeaderContainer,
   CompanyLogo,
   UserProfilePic
} from './styledComponents'

type AppHeaderProps = {
   userProfilePicLink: string
   username: string
   onClickUserProfile: any
}

class AppHeader extends React.Component<AppHeaderProps> {
   render() {
      const { userProfilePicLink, username, onClickUserProfile } = this.props
      const { imageAlts } = i18n
      return (
         <AppHeaderContainer>
            <CompanyLogo
               alt={imageAlts.iBHubsLogo}
               src={images.ibHubsHorizontalLogo}
            />
            <UserProfilePic
               onClick={onClickUserProfile}
               alt={`${username} ${imageAlts.profilePic}`}
               src={userProfilePicLink}
            />
         </AppHeaderContainer>
      )
   }
}

export { AppHeader }
