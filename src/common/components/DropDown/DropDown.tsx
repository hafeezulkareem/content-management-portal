import React from 'react'

import { DROP_DOWN_SELECT_TEST_ID } from '../../constants/IdConstants'

import {
   DropDownSelect,
   DropDownContainer,
   DropDownOption,
   DropDownArrow
} from './styledComponents'

type DropDownProps = {
   options: Array<{ optionText: string; id: string; value: string }>
   defaultOption: string
   onChangeType: any
   selectedOption: string
}

class DropDown extends React.Component<DropDownProps> {
   render() {
      const {
         options,
         defaultOption,
         onChangeType,
         selectedOption
      } = this.props
      return (
         <DropDownContainer>
            <DropDownSelect
               onChange={onChangeType}
               value={selectedOption.toUpperCase()}
               data-testid={DROP_DOWN_SELECT_TEST_ID}
            >
               {defaultOption ? (
                  <DropDownOption hidden={true}>Languages</DropDownOption>
               ) : null}
               {options.map(option => (
                  <DropDownOption value={option.value} key={option.id}>
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
