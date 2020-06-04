import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

type InputProps = {
   error: string | null
}

export const InputFieldWrapper = styled.div`
   ${(props: InputProps) =>
      props.error
         ? `border-color: ${colors.neonRed}; background-color: ${colors.neonRed_5};`
         : ''}
   ${tw`w-full border border-solid rounded flex items-center py-2 px-3 text-sm my-2`}
`

export const InputFieldEl = styled.input`
   ${(props: InputProps) =>
      props.error ? `background-color: ${colors.neonRed_5}; opacity: .25;` : ''}
   ${tw`
        w-full mr-2 focus:outline-none
    `}
`

export const InputFieldErrorIcon = styled.img`
   ${tw`
        w-4 h-4
    `}
`
