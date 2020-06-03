import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const CleanSolutionContainer = styled.div`
   width: 625px;
   ${tw`
        flex flex-col mx-auto
    `}
`
export const ErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-xs text-center
    `}
`
