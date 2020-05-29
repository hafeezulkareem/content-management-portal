import React from 'react'
import { render } from '@testing-library/react'

import { AppHeader } from '.'

const username = 'Chi lee'

describe('AppHeader tests', () => {
   it('should render company logo', () => {
      const { getByAltText } = render(
         <AppHeader userProfilePicLink='' username='' />
      )

      expect(getByAltText(/ib hubs logo/i)).toBeInTheDocument()
   })

   it('should render user profile pic', () => {
      const { getByAltText } = render(
         <AppHeader userProfilePicLink='' username={username} />
      )
      expect(getByAltText(/chi lee profile pic/i)).toBeInTheDocument()
   })
})
