import React from 'react'

import i18n from '../../i18n/strings.json'
import { ADD_BUTTON_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'

import { AddButtonEl, PlusImage } from './styledComponents'

type AddButtonProps = {
   onClickAddButton: (any) => void
}

class AddButton extends React.Component<AddButtonProps> {
   render() {
      const { commonComponents } = i18n as any
      const { onClickAddButton } = this.props
      return (
         <AddButtonEl
            onClick={onClickAddButton}
            data-testid={ADD_BUTTON_TEST_ID}
         >
            <PlusImage alt='Plus Image' src={images.plusWhite} />
            {commonComponents.add}
         </AddButtonEl>
      )
   }
}

export { AddButton }
