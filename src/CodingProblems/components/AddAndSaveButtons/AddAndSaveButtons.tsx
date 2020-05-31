import React from 'react'

import { AddButton } from '../../../Common/components/AddButton'
import { SaveButton } from '../../../Common/components/SaveButton'

import { ButtonsContainer } from './styledComponents'

type AddAndSaveButtonsProps = {
   onClickAddButton: (any) => void
   onClickSaveButton: (any) => void
}

class AddAndSaveButtons extends React.Component<AddAndSaveButtonsProps> {
   render() {
      const { onClickAddButton, onClickSaveButton } = this.props
      return (
         <ButtonsContainer>
            <AddButton onClickAddButton={onClickAddButton} />
            <SaveButton onClickSaveButton={onClickSaveButton} />
         </ButtonsContainer>
      )
   }
}

export { AddAndSaveButtons }
