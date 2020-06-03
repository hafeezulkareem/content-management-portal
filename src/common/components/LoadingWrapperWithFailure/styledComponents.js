import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const LoadingViewContainer = styled.div`
   background-color: ${colors.lightBlueGrey24};
   ${tw`flex flex-col justify-center mx-8 h-full items-center`}
`

export const FailureViewContainer = styled.div`
   background-color: ${colors.lightBlueGrey24};
   ${tw`flex flex-col justify-center mx-8 h-full items-center`}
`

export const FailureViewMessage = styled.p`
   ${tw`my-6 text-2xl text-center`}
`

export const RetryButton = styled.button`
   ${tw`px-8 py-2 mb-6 bg-blue-500 text-white text-2xl rounded`}
`
