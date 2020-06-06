import React from 'react'

import { AddButton } from '../../../Common/components/AddButton'
import { Button } from '../../../Common/components/Button'
import colors from '../../../Common/themes/Colors'

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
            <Button
               onClickButton={onClickSaveButton}
               backgroundColor={colors.greenishTeal}
               textColor={colors.white}
            />
         </ButtonsContainer>
      )
   }
}

export { AddAndSaveButtons }
