import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const LoadingViewContainer = styled.div`
   background-color: ${colors.whiteTwo};
   ${tw`w-full h-full flex flex-col justify-center py-6 items-center`}
`

export const FailureViewContainer = styled.div`
   background-color: ${colors.whiteTwo};
   ${tw`w-full h-full flex flex-col justify-center py-6 items-center`}
`

export const ImageContainer = styled.div`
   ${tw`
      w-full h-full flex items-center justify-center
   `}
`

export const FailureImage = styled.img`
   ${tw`
      w-64 h-64
   `}
`

export const FailureViewMessage = styled.p`
   ${tw`mb-4 text-xl text-center`}
`

export const RetryButton = styled.button`
   background-color: ${colors.brightBlue};
   ${tw`px-8 py-2 mb-6 text-white text-xl rounded`}
`
