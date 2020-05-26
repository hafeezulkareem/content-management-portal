import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const DropDownContainer = styled.div`
   ${tw`
      w-32 h-10 flex items-center bg-red-900 relative border rounded-sm border-gray-300 bg-white
   `}
`

export const DropDownSelect = styled.select`
   ${tw`
      appearance-none w-full h-full px-2 focus:outline-none cursor-pointer text-sm
   `}
`

export const DropDownOption = styled.option`
   ${tw`
      cursor-pointer
   `}
`

export const DropDownArrow = styled.img`
   ${tw`
      pointer-events-none absolute right-0 pr-2 text-gray-700
   `}
`
