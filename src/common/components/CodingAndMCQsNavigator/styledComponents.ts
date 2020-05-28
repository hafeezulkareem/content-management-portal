import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const NavigatorContainer = styled.div`
   ${tw`
        flex justify-center items-center py-4 my-8
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        w-auto flex items-center
    `}
`

type ButtonProps = {
   isActive: boolean
}

export const MCQsButton = styled.button`
   ${(props: ButtonProps) =>
      props.isActive
         ? `background-color: ${colors.brightBlue};
            border-color: ${colors.lightBlueGrey};
            color: white;`
         : `background-color: ${colors.lightBlueGrey};
            border-color: ${colors.lightBlueGrey24};`}
   ${tw`
        w-56 text-sm py-2 border border-solid rounded-tl-md rounded-bl-md focus:outline-none
    `}
`

export const CodingProblemsButton = styled.button`
   ${(props: ButtonProps) =>
      props.isActive
         ? `background-color: ${colors.brightBlue};
          border-color: ${colors.lightBlueGrey};
          color: white;`
         : `background-color: ${colors.lightBlueGrey};
          border-color: ${colors.lightBlueGrey24};`}
   ${tw`
        w-56 text-sm py-2 px-8 border border-solid rounded-tr-md rounded-br-md focus:outline-none
    `}
`
