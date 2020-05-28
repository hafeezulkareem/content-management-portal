import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const HtmlPreviewerContainer = styled.div`
   background-color: ${colors.lightBlueGrey40};
   border-color: ${colors.lightBlueGrey40};
   height: 565px;
   ${tw`
        w-full border border-solid p-2 overflow-auto
   `};
`
