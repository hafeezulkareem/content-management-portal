import React, { ChangeEvent } from 'react'

import { DROP_DOWN_SELECT_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import {
   DropDownSelect,
   DropDownContainer,
   DropDownOption,
   DropDownArrow
} from './styledComponents'

interface DropDownProps {
   options: Array<{ optionText: string; id: string; value: string }>
   defaultOption: string
   onChangeType: (event: ChangeEvent<HTMLSelectElement>) => void
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
      const { imageAlts } = i18n
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
               alt={imageAlts.dropDownArrow}
               src={images.chevronDropDown}
            />
         </DropDownContainer>
      )
   }
}

export { DropDown }
