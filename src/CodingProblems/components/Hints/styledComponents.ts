import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import commonColors from '../../../common/themes/Colors'
import { Typo12HKGroteskSemiBoldSteel } from '../../../styleGuide/Typos'

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
   color: ${commonColors.darkBlueGrey};
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
   border-color: ${commonColors.lightBlueGrey40};
   ${tw`
        border border-solid rounded-sm py-2 px-4 focus:outline-none text-sm
    `}
`

export const TextArea = styled.textarea`
   border-color: ${commonColors.lightBlueGrey40};
   ${tw`
        h-32 border border-solid rounded-sm text-sm p-2 focus:outline-none resize-none
    `}
`

export const TextLabel = styled(Typo12HKGroteskSemiBoldSteel)`
   ${tw`
        mt-6 mb-2
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        mt-6 mb-4
    `}
`
