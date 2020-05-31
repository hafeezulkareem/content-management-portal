import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const SignInPageWrapper = styled.div`
   ${tw`
        w-screen h-screen bg-gray-100 flex justify-center items-center
    `}
`

export const SignInContainer = styled.div`
   width: 475px;
   ${tw`
        flex flex-col text-center bg-white px-16 pt-2 pb-12 rounded
    `}
`

export const SignInLogo = styled.img`
   ${tw`
        w-24 h-24 mx-auto mt-4
    `}
`

export const SignInTitle = styled.h1`
   color: ${colors.darkBlueGrey};
   ${tw`
        text-2xl my-4
    `}
`

export const FieldWrapper = styled.div`
   ${tw`
        flex flex-col mt-4 items-start
    `}
`

export const SignInForm = styled.form`
   ${tw`
        flex flex-col
    `}
`

export const TextLabel = styled.span`
   color: ${colors.steel};
   ${tw`
        text-xs
    `};
`

export const ErrorMessage = styled.span`
   color: ${colors.neonRed};
   ${tw`
        text-xs
    `}
`

export const SignInButton = styled.button`
   background-color: ${colors.brightBlue};
   ${tw`
        text-white font-bold py-3 mt-8 mb-4 rounded text-sm focus:outline-none
    `};
`

export const SignUpMessage = styled.p`
   ${tw`
        mt-2 text-sm
    `}
`

export const SignUpLink = styled.a`
   ${tw`
        text-blue-600
    `}
`

export const SignInErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-sm mt-4
    `}
`
