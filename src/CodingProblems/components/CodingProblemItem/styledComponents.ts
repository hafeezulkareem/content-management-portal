import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const CodingQuestionItem = styled.div`
   ${tw`
        flex items-center py-3 border-t cursor-pointer hover:bg-gray-300
    `}
`

export const DummyCheckbox = styled.div`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        w-6 h-6 flex items-center justify-center border border-solid rounded-full mx-4 cursor-pointer
    `}
`

export const Icon = styled.img`
   ${tw`
    `}
`

export const QuestionText = styled.p`
   color: ${colors.steel};
   ${tw`
        text-xs
    `}
`
