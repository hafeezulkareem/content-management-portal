import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import commonColors from '../../../common/themes/Colors'

export const TestCasesContainer = styled.div`
   ${tw`
        flex flex-col px-16
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        py-4
    `}
`

export const LabelAndEditorContainer = styled.div`
   ${tw`
        h-64 flex flex-col
    `}
`

export const TextLabel = styled.span`
   color: ${commonColors.steel};
   ${tw`
        text-xs my-3
    `}
`

export const ScoreInputField = styled.input`
   border-color: ${commonColors.lightBlueGrey40};
   ${tw`
        w-12 h-12 p-2 border border-solid text-md rounded focus:outline-none
    `}
`
