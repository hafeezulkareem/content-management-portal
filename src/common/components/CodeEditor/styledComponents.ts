import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const CodeEditorContainer = styled.div`
   height: 320px;
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        w-full flex flex-col border border-solid rounded my-4
    `};
`
