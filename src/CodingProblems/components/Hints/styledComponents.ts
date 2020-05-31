import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const HintsContainer = styled.div`
   width: 65vw;
   ${tw`
        flex flex-col
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        pb-4
    `}
`

export const FormWithSaveButton = styled.div`
   ${tw`
        flex flex-col mt-8 px-40
    `}
`

export const HintsFormContainer = styled.div`
   ${tw`
        flex flex-col p-4 border border-solid rounded
    `}
`

export const HintsFormHeader = styled.div`
   ${tw`
        flex justify-between
    `}
`

export const HintsTitle = styled.h2`
   color: ${colors.darkBlueGrey};
   ${tw`
        text-lg
    `}
`

export const RemoveIcon = styled.img`
   ${tw`
        w-4 h-4 cursor-pointer
    `}
`

export const InputField = styled.input`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        border border-solid rounded-sm py-2 px-4 focus:outline-none text-sm
    `}
`

export const TextArea = styled.textarea`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        h-32 border border-solid rounded-sm text-sm p-2 focus:outline-none resize-none
    `}
`

export const TextLabel = styled.span`
   ${colors.steel}
   ${tw`
        mt-6 mb-2 text-sm
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        mt-6 mb-4
    `}
`
