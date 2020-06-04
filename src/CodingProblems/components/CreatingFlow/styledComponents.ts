import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const AppContainer = styled.div`
   background-color: ${colors.whiteTwo};
   ${tw`
        min-w-screen min-h-screen
    `}
`

export const ContentContainer = styled.div`
   ${tw`
        flex flex-col mt-12
    `}
`

export const BackButtonContainer = styled.div`
   ${tw`
        mx-16
    `}
`

export const Wrapper = styled.div`
   ${tw`
        flex
    `}
`

export const SectionWrapper = styled.div`
   ${tw`
        w-full flex flex-col
    `}
`

type LoadingWrapperWithStatementProps = {
   isLoading: boolean
}

export const LoadingWrapperWithStatement = styled.div`
   ${(props: LoadingWrapperWithStatementProps) =>
      props.isLoading ? `height: 50vh; margin: 0 5%;` : ``}
`
