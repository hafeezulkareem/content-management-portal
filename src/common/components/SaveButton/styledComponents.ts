import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const SaveButtonEl = styled.button`
   background-color: ${colors.brightBlue};
   ${tw`
        text-sm px-4 py-2 text-white rounded focus:outline-none
    `}
`
