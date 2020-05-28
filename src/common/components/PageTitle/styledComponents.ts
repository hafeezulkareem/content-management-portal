import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const PageTitleContainer = styled.div`
   ${tw`
        flex mx-20 mt-6 mb-8
    `}
`

export const PageTitleEl = styled.h1`
   color: ${colors.darkBlueGrey};
   ${tw`
        text-xl
    `}
`
