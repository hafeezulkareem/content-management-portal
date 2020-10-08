import React from 'react'

import i18n from '../../i18n/strings.json'
import { ADD_BUTTON_TEST_ID } from '../../constants/IdConstants'
import images from '../../themes/Images'

import { AddButtonEl, PlusImage } from './styledComponents'

interface AddButtonProps {
   onClickAddButton: () => void
}

class AddButton extends React.Component<AddButtonProps> {
   render() {
      const { commonComponents, imageAlts } = i18n
      const { onClickAddButton } = this.props
      return (
         <AddButtonEl
            onClick={onClickAddButton}
            data-testid={ADD_BUTTON_TEST_ID}
         >
            <PlusImage alt={imageAlts.plusIcon} src={images.plusWhite} />
            {commonComponents.add}
         </AddButtonEl>
      )
   }
}

export { AddButton }
