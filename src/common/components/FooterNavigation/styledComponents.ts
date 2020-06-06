import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const FooterNavigationContainer = styled.div`
   ${tw`
        flex justify-between mt-4 mx-8
    `}
`

export const PageDetailsContainer = styled.div`
   ${tw`
        flex items-center
    `}
`

export const PageDetails = styled.p`
   color: ${colors.steel};
   ${tw`
        text-sm font-semibold
    `}
`
