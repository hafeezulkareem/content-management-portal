import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const TestCasesContainer = styled.div`
   width: 625px;
   ${tw`
        flex flex-col
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        pb-4
    `}
`

export const LabelAndEditorContainer = styled.div`
   ${tw`
        h-64 flex flex-col
    `}
`

export const TextLabel = styled.span`
   color: ${colors.steel};
   ${tw`
        text-xs my-3
    `}
`

export const ScoreInputField = styled.input`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        w-12 h-12 p-2 border border-solid text-md rounded focus:outline-none
    `}
`

export const CheckboxContainer = styled.div`
   ${tw`
        flex items-center py-4
    `}
`

export const Checkbox = styled.input`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        w-4 h-4 border border-solid rounded-sm cursor-pointer
    `}
`

export const CheckboxLabel = styled.span`
   ${tw`
        ml-2 text-sm
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        flex justify-end mb-4
    `}
`
