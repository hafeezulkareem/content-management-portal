import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const BackButtonContainer = styled.div`
   ${tw`
        flex mx-20
    `}
`

export const BackButtonEl = styled.button`
   color: ${colors.steel};
   ${tw`
        flex items-center text-xs focus:outline-none
    `}
`

export const BackButtonIcon = styled.img`
   ${tw`
        w-4 h-4 mr-1
    `}
`
