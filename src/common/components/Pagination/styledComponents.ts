import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const PaginationContainer = styled.div`
   ${tw`
      w-64 flex items-center justify-between
    `}
`

export const PreviousAndNextButton = styled.button`
   border-color: ${colors.lightBlueGrey};
   padding: 7px;
   ${tw`
      rounded border border-solid focus:outline-none
   `};
`

export const Icon = styled.img`
   ${tw`

   `}
`

type PaginatorNavigationButtonProps = {
   isDisabled: boolean
}
export const PaginatorNavigationButton = styled.button`
   ${(props: PaginatorNavigationButtonProps) =>
      props.isDisabled
         ? tw`bg-black text-white p-2 focus:outline-none opacity-50 cursor-not-allowed`
         : tw`bg-black text-white p-2 focus:outline-none`}
`

export const PaginatorCurrentPageNumber = styled.span`
   ${tw`
        mx-2 px-3 py-1 border border-solid border-black
    `}
`

export const PaginatorTotalPageCount = styled.span`
   ${tw`
        mx-2
    `}
`
