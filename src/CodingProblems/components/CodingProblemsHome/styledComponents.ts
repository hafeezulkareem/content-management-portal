import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const AppContainer = styled.div`
   background-color: ${colors.whiteTwo};
   ${tw`
        min-w-screen min-h-screen
    `}
`

export const LoadingWrapperAndProblemsList = styled.div`
   height: 54vh;
   ${tw`
        mx-8
    `}
`

export const DeleteButtonContainer = styled.div`
   ${tw`
        flex items-center justify-center mx-8 mt-2
    `}
`
