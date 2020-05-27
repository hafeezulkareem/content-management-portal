import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const ContentEditorContainer = styled.div`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
      w-full h-full border border-solid rounded
   `}
`
