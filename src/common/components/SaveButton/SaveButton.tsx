import React from 'react'

import i18n from '../../i18n/strings.json'

import { SaveButtonEl } from './styledComponents'

type SaveButtonProps = {
   onClickSaveButton: (any) => void
}

class SaveButton extends React.Component<SaveButtonProps> {
   render() {
      const { commonComponents } = i18n as any
      const { onClickSaveButton } = this.props
      return (
         <SaveButtonEl onClick={onClickSaveButton}>
            {commonComponents.save}
         </SaveButtonEl>
      )
   }
}

export { SaveButton }
