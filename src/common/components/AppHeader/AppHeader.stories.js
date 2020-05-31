import React from 'react'

import images from '../../themes/Images'

import { AppHeader } from './AppHeader'

export default {
   title: 'common/AppHeader'
}

export const appHeader = () => (
   <AppHeader userProfilePicLink={images.testingUserPic} username='Shin Lee' />
)
