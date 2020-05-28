import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const AppHeaderContainer = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        w-full flex justify-between py-3 px-6 border-b border-solid
    `}
`

export const CompanyLogo = styled.img`
   width: 216px;
   height: 36px;
   ${tw`
      cursor-pointer
   `}
`

export const UserProfilePic = styled.img`
   width: 40px;
   height: 40px;
   ${tw`
      cursor-pointer
   `}
`
