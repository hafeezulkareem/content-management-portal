import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

type ButtonElProps = {
   isActive: boolean
}

export const ButtonEl = styled.button`
    ${(props: ButtonElProps) =>
       props.isActive
          ? `border-color: ${colors.darkBlueGrey}; color: ${colors.darkBlueGrey}`
          : `border-color: ${colors.lightBlueGrey}; color: ${colors.steel};`}
    background-color: ${colors.lightBlueGrey}
    ${tw`
        flex items-center font-semibold justify-center w-8 h-8 inline-block rounded border border-solid focus:outline-none
    `}
`
