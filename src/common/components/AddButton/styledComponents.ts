import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const AddButtonEl = styled.button`
   background-color: ${colors.greenishTeal};
   ${tw`
        text-sm flex items-center px-4 py-2 text-white rounded focus:outline-none
    `}
`

export const PlusImage = styled.img`
   ${tw`
        mr-2
    `}
`
