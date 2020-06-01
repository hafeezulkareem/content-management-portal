import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const ComponentContainer = styled.div`
   ${tw`
        w-full flex
    `}
`

export const NumberButtonsContainer = styled.div`
   ${tw`
        w-full h-20 flex items-center mx-2 overflow-auto
    `}
`

export const MoveButton = styled.button`
   ${tw`
        focus:outline-none
    `}
`

export const MoveRightButton = styled(MoveButton)`
   ${tw`
        ml-auto ml-2
    `}
`

export const Icon = styled.img`
   ${tw`
        w-5 h-5
    `}
`
