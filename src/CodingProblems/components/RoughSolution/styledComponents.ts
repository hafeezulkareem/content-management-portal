import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const RoughSolutionContainer = styled.div`
   ${tw`
        flex flex-col mb-4
    `}
`

export const RoughSolutionsWrapper = styled.div`
   ${tw`
        self-center
    `}
`

export const CodeEditorsContainer = styled.div`
   ${tw`
        w-full
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        w-40 justify-between flex my-6
    `}
`

export const ErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-xs text-center my-2
    `}
`

export const RoughSolutionsError = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-md mx-auto -mt-4 mb-2
    `}
`
