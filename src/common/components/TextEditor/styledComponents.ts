import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const TextEditorContainer = styled.div`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        w-2/4 h-64 flex flex-col border border-solid rounded
    `}
`
