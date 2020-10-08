import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const CircleAddButtonEl = styled.button`
   background-color: ${colors.white};
   ${tw`
        self-center p-3 rounded-full border border-solid border-gray-300 focus:outline-none
    `}
`
export const PlusImage = styled.img`
   ${tw`
        w-3 h-3
    `}
`
