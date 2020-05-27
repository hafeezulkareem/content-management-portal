import styled from '@emotion/styled'
import tw from 'tailwind.macro'

type NumberButtonElProps = {
   isActive: boolean
}

export const NumberButtonEl = styled.button`
   width: 56px;
   height: 56px;
   ${(props: NumberButtonElProps) =>
      props.isActive
         ? tw`text-blue-600 mr-4 text-xl bg-white rounded border border-solid border-blue-400 shadow-lg font-bold focus:outline-none`
         : tw`text-gray-600 mr-4 text-xl bg-white rounded border border-solid border-gray-300 shadow-lg font-bold focus:outline-none`}
`
