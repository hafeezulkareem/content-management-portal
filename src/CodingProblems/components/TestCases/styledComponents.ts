import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const TestCasesContainer = styled.div`
   ${tw`
        flex flex-col mx-20
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        flex pb-4
    `}
`

export const ErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        mx-auto text-sm
    `}
`
