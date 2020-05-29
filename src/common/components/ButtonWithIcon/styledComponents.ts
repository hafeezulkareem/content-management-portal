import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const ButtonContainer = styled.div`
   ${tw`
        flex
    `}
`

export const ButtonEl = styled.button`
   color: ${colors.steel};
   ${tw`
        flex items-center p-2 text-xs focus:outline-none
    `}
`

export const ButtonIcon = styled.img`
   ${tw`
        w-4 h-4 mr-1
    `}
`
