import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const InputField = styled.input`
   background-color: ${colors.steel_4};
   border-color: ${colors.lightBlueGrey};
   ${tw`
      w-48 h-8 px-2 py-3 border rounded-sm text-xs text-gray-600 focus:outline-none
   `};
`
