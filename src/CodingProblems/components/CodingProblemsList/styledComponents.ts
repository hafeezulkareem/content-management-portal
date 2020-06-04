import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const CodingProblemsListContainer = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        rounded-sm border border-solid
    `}
`

export const ListHeader = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        flex items-center py-4 border-solid
    `}
`

export const FirstColumn = styled.div`
   ${tw`
        w-2/6 flex items-center
    `}
`

export const SecondColumn = styled.div`
   ${tw`
        w-1/6 flex justify-center items-center
    `}
`

export const ThirdColumn = styled.div`
   ${tw`
        w-1/6 flex justify-center items-center
    `}
`

export const FourthColumn = styled.div`
   ${tw`
        w-1/6 flex justify-center items-center
    `}
`

export const FifthColumn = styled.div`
   ${tw`
        w-1/6 flex justify-center items-center
    `}
`

export const SixthColumn = styled.div`
   ${tw`
        w-1/6 flex justify-center items-center
    `}
`

export const HeaderTextLabel = styled.span`
   ${tw`
        text-xs
    `}
`

export const QuestionsTitle = styled.div`
   margin-left: 55px;
   ${tw`
        flex items-center
    `}
`

export const CodingProblemsItemList = styled.div`
   ${tw`
        flex flex-col
    `}
`
