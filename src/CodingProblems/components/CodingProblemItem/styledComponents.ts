import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import commonColors from '../../../common/themes/Colors'

import colors from '../../themes/Colors'

export const CodingQuestionItem = styled.div`
   ${tw`
        flex items-center py-3 border-t
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
   color: ${commonColors.steel};
   ${tw`
        text-xs
    `}
`
