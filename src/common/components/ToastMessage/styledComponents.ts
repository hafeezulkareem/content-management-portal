import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

type ToastMessageContainerProps = {
   isError: boolean
}

export const ToastMessageContainer = styled.div`
   ${(props: ToastMessageContainerProps) =>
      props.isError
         ? `background-color: ${colors.neonRed};`
         : `background-color: ${colors.greenishTeal};`}
   ${tw`
        w-full h-full top-0 left-0 flex items-center justify-center rounded absolute
    `}
`

export const Icon = styled.img`
   ${tw`
        w-6 h-6
   `}
`

export const Message = styled.p`
   ${tw`
        text-sm ml-2 text-white
    `}
`
