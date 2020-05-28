import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../themes/Colors'

export const CodeEditorContainer = styled.div`
   border-color: ${colors.lightBlueGrey40};
   ${tw`
        border border-solid rounded-sm relative
    `}
`

export const HeaderContainer = styled.div`
   ${tw`
        flex items-center my-2 mx-6
    `}
`

export const DeleteIcon = styled.img`
   ${tw`
        ml-2
    `}
`

export const EditorContainer = styled.div`
   height: 320px;
   ${tw`
        w-full
    `}
`

export const DropDownContainer = styled.div`
   bottom: 20px;
   right: 25px;
   ${tw`
        absolute w-auto h-auto
    `}
`
