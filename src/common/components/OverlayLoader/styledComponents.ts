import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const OverlayLoaderContainer = styled.div`
   background-color: ${colors.lightBlack};
   ${tw`
        w-screen h-screen fixed flex items-center justify-center top-0 right-0 z-50
    `}
`
