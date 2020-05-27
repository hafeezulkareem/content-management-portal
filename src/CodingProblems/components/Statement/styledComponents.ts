import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const StatementContainer = styled.div`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        flex w-full bg-white
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
        border border-solid focus:outline-none p-2 my-2 rounded-sm
    `}
`

export const StatementRightSection = styled.div`
   ${tw`
        w-1/2 border border-solid rounded-sm
    `}
`
