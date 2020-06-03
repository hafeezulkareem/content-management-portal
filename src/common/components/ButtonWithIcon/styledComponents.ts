import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

type ButtonElProps = {
   isDisabled: boolean
}

export const ButtonEl = styled.button`
    ${(props: ButtonElProps) =>
       props.isDisabled ? `cursor: not-allowed;` : `cursor: pointer`}
   color: ${colors.steel};
   ${tw`
        flex items-center py-2 ml-3 text-xs focus:outline-none
    `}
`

export const ButtonIcon = styled.img`
   ${tw`
        w-4 h-4 mr-1
    `}
`
