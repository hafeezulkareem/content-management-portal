import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const InputFieldWrapper = styled.div`
   ${tw`
        w-full border border-solid rounded flex items-center py-2 px-3 text-sm my-2
    `}
`
export const InputFieldEl = styled.input`
   ${tw`
        w-full mr-2 focus:outline-none
    `}
`

export const InputFieldErrorIcon = styled.img`
   ${tw`
        w-4 h-4
    `}
`
