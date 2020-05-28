import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const HeaderContainer = styled.div`
   ${tw`
        flex justify-between items-center py-2 px-6 border-b border-gray-300
    `}
`

export const HeaderLeftSection = styled.div`
   ${tw`

    `}
`

export const InputField = styled.input`
   ${tw`
      w-48 h-8 px-2 py-3 border border-gray-400 rounded-sm bg-gray-200 text-xs text-gray-600 focus:outline-none
   `}
`

export const HeaderRightSection = styled.div`
   ${tw`
        flex
    `}
`

export const DeleteIcon = styled.img`
   ${tw`
        mx-4 cursor-pointer
    `}
`

export const EditIcon = styled.img`
   ${tw`
        cursor-pointer
    `}
`
