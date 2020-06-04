import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const PaginationContainer = styled.div`
   ${tw`
      flex items-center
    `}
`

type PreviousAndNextButtonProps = {
   isDisabled: boolean
}

export const PreviousAndNextButton = styled.button`
   border-color: ${colors.lightBlueGrey};
   padding: 7px;
   ${(props: PreviousAndNextButtonProps) =>
      props.isDisabled
         ? tw`rounded border border-solid focus:outline-none cursor-not-allowed opacity-25`
         : tw`rounded border border-solid focus:outline-none`}
`

export const PreviousButton = styled(PreviousAndNextButton)`
   ${tw`
      mr-2
   `}
`

export const Icon = styled.img`
   ${tw`

   `}
`

export const Dots = styled.span`
   color: ${colors.steel};
   ${tw`
      text-xl mr-2
   `}
`
