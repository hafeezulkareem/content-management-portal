import React from 'react'
import { observer } from 'mobx-react'

import i18n from '../../i18n/strings.json'
import images from '../../themes/Images'

import { SelectContainer, SelectIcon, SelectLabel } from './styledComponents'

type SelectListProps = {
   isSelected: boolean
   onSelect: any
}

@observer
class SelectList extends React.Component<SelectListProps> {
   render() {
      const { isSelected, onSelect } = this.props
      const { selectAll, imageAlts } = i18n as any
      return (
         <SelectContainer>
            <SelectIcon
               onClick={onSelect}
               alt={imageAlts.selectIcon}
               src={
                  isSelected ? images.selectedCheckbox : images.defaultCheckbox
               }
            />
            <SelectLabel>{selectAll}</SelectLabel>
         </SelectContainer>
      )
   }
}

export { SelectList }
