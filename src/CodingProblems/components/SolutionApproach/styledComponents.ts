import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

import { Typo12HKGroteskSemiBoldSteel } from '../../../styleGuide/Typos'

export const SolutionApproachContainer = styled.div`
   ${tw`
        mb-4 flex flex-col
    `}
`
export const TextLabel = styled(Typo12HKGroteskSemiBoldSteel)`
   ${tw`
        text-xs mb-2 mt-6
    `}
`

export const SolutionApproachLeftSection = styled.div`
   ${tw`
        flex flex-col w-1/2 px-8 py-20
    `}
`

export const LeftAndRightSections = styled.div`
   ${tw`
        flex
    `}
`

export const TitleInputField = styled.input`
   border-color: ${colors.lightBlueGrey};
   ${tw`
        border border-solid px-4 py-2 rounded-sm text-sm focus:outline-none
    `}
`

export const TextEditorContainer = styled.div`
   height: 320px;
   ${tw`
        flex flex-col w-full
    `}
`

export const SolutionApproachRightSection = styled.div`
   ${tw`
        w-1/2 flex
    `}
`

export const SaveButtonContainer = styled.div`
   ${tw`
        flex self-end mt-8 mb-4 px-16
    `}
`
