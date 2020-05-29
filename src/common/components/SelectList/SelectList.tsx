import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'

import { SelectContainer, SelectIcon, SelectLabel } from './styledComponents'

type SelectListProps = {
   isSelected: boolean
   onSelect: any
}

@observer
class SelectList extends React.Component<SelectListProps> {
   render() {
      const { isSelected, onSelect } = this.props
      const { selectAll } = i18n as any
      return (
         <SelectContainer>
            <SelectIcon
               onClick={onSelect}
               alt='Select Icon'
               src={
                  isSelected
                     ? 'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/5b92e0c0-dc2a-48ae-a933-48589ebc4b30.svg'
                     : 'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9a57053d-032f-4c6b-911e-c399651afae7.svg'
               }
            />
            <SelectLabel>{selectAll}</SelectLabel>
         </SelectContainer>
      )
   }
}

export { SelectList }
