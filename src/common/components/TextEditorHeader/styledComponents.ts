import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const HeaderContainer = styled.div`
   ${tw`
        border-b border-solid border-gray-300 px-6 py-2
    `}
`

export const HeaderSection = styled.div`
   ${tw`
        flex justify-end
    `}
`

export const DeleteIcon = styled.img`
   ${tw`
        cursor-pointer mx-4
    `}
`

export const EditIcon = styled.img`
   ${tw`
        cursor-pointer
    `}
`
