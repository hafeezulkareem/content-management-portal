import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const NoDataViewContainer = styled.div`
   ${tw`flex flex-col h-full h-full text-center p-8`}
`

export const ImageContainer = styled.div`
   ${tw`
      w-full h-full flex items-center justify-center
   `}
`

export const NoDataImage = styled.img`
   ${tw`
      w-64 h-64
   `}
`

export const NoDataViewText = styled.p`
   ${tw`text-lg`}
`
