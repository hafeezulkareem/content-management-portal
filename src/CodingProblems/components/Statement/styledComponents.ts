import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const StatementContainer = styled.div`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        flex flex-col w-full bg-white
    `}
`

export const LeftAndRightSections = styled.div`
   ${tw`
        flex
    `}
`

export const StatementLeftSection = styled.div`
   ${tw`
        w-1/2 p-16 border border-solid rounded-sm
    `}
`

export const LeftSectionContainer = styled.div`
   ${tw`
        flex flex-col w-full
    `}
`

export const TextLabel = styled.p`
   line-height: 1.33;
   letter-spacing: 0.12px;
   ${tw`
        text-xs my-2
    `}
`

export const ShortTextInputField = styled.input`
   ${tw`
        border border-solid focus:outline-none p-2 my-2 rounded-sm text-sm
    `}
`

export const StatementRightSection = styled.div`
   ${tw`
        flex w-1/2 border border-solid rounded-sm
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        flex justify-end mt-8 mb-6 pr-8
    `}
`

export const ErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-xs
    `};
`

export const PostStatementError = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-md mx-auto -mt-4 mb-2
    `}
`
