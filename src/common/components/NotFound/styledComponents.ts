import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const NotFoundContainer = styled.div`
   ${tw`
        w-screen h-screen flex flex-col items-center justify-center
    `}
`

export const NotFoundErrorImage = styled.img`
   ${tw`
        w-72 h-64
    `}
`

export const NotFoundMessageContainer = styled.div`
   ${tw`
        flex p-4 mt-6
    `}
`

export const ErrorIconContainer = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        px-4 flex items-center justify-center border border-solid rounded
    `}
`

export const NotFoundErrorIcon = styled.img`
   ${tw`
        mx-2
    `}
`

export const ErrorMessageContainer = styled.div`
   ${tw`
        flex flex-col justify-center ml-6
    `}
`

export const ErrorMessageTitle = styled.h1`
   ${tw`
        text-2xl
    `}
`

export const ErrorMessage = styled.p`
   color: ${colors.steel};
   ${tw`
        mt-2 text-md
    `}
`

export const GoToHomeButton = styled.button`
   background-color: ${colors.brightBlue};
   ${tw`
        px-4 py-3 my-3 rounded text-white focus:outline-none
    `}
`
