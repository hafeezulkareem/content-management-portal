import styled from '@emotion/styled'
import tw from 'tailwind.macro'

type ButtonElProps = {
   backgroundColor: string
   textColor: string
}

export const ButtonEl = styled.button`
   ${(props: ButtonElProps) =>
      `background-color: ${props.backgroundColor}; color: ${props.textColor};`}
   ${tw`
        text-sm px-4 py-2 rounded focus:outline-none
    `}
`
