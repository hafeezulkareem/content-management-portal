import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const NavigatorContainer = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        flex mx-20 mb-12 border-b border-solid
    `};
`

type NavigationButtonProps = {
   isActive: boolean
   isDisabled: boolean
}
export const NavigationButton = styled.button`
   line-height: 16px;
   letter-spacing: 0.12px;
   ${tw`
        text-xs focus:outline-none py-2 mr-8 border-b-2 border-solid
    `}
   ${(props: NavigationButtonProps) =>
      props.isActive
         ? `border-color: ${colors.brightBlue};`
         : `border-color: ${colors.whiteTwo};`}
   ${(props: NavigationButtonProps) =>
      props.isDisabled ? `cursor: not-allowed;` : `cursor: pointer;`}
`
