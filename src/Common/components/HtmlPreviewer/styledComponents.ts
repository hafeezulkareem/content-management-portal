import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const HtmlPreviewerContainer = styled.div`
   background-color: ${colors.lightBlueGrey40};
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        w-full h-full flex-auto border border-solid p-2
   `};
`

export const IFrame = styled.iframe`
   ${tw`
      w-full h-full
   `}
`
