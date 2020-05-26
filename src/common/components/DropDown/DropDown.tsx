import React from 'react'

import {
   DropDownSelect,
   DropDownContainer,
   DropDownOption,
   DropDownArrow
} from './styledComponents'

type DropDownProps = {
   options: Array<{ optionText: string; id: string }>
   defaultOption: string
}

class DropDown extends React.Component<DropDownProps> {
   render() {
      const { options, defaultOption } = this.props
      return (
         <DropDownContainer>
            <DropDownSelect>
               {defaultOption ? (
                  <DropDownOption hidden={true}>Languages</DropDownOption>
               ) : null}
               {options.map(option => (
                  <DropDownOption value={option.optionText} key={option.id}>
                     {option.optionText}
                  </DropDownOption>
               ))}
            </DropDownSelect>
            <DropDownArrow
               alt='Drop Down Arrow'
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/a80d2201-07ff-43af-b6e8-ec5e67ed0a72.svg'
            />
         </DropDownContainer>
      )
   }
}

export { DropDown }
