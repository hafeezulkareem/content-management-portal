import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../Common/themes/Colors'

export const FormWithSaveButton = styled.div`
   ${tw`
        w-2/5 flex flex-col mt-4 self-center
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

export const InputField = styled.input`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        border border-solid rounded-sm py-2 px-4 focus:outline-none text-sm
    `}
`

export const TextAreaHeader = styled.div`
   ${tw`
        flex justify-between items-center mt-4 mb-2
    `}
`

export const TextArea = styled.textarea`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        h-32 border border-solid rounded-sm text-sm p-2 focus:outline-none resize-none
    `}
`

export const DescriptionLabel = styled.span`
   color: ${colors.steel};
   ${tw`
        text-sm
    `}
`

export const TextLabel = styled.span`
   color: ${colors.steel};
   ${tw`
        mt-8 mb-2 text-sm
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        mt-6 mb-4
    `}
`

export const ErrorMessage = styled.p`
   color: ${colors.neonRed};
   ${tw`
        text-xs mt-2
    `}
`
