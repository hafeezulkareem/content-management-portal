import React from 'react'

import { AddButton } from '../../../Common/components/AddButton'
import { Button } from '../../../Common/components/Button'
import colors from '../../../Common/themes/Colors'
import commonI18n from '../../../Common/i18n/strings.json'

import { ButtonsContainer } from './styledComponents'

type AddAndSaveButtonsProps = {
   onClickAddButton: (any) => void
   onClickSaveButton: (any) => void
}

class AddAndSaveButtons extends React.Component<AddAndSaveButtonsProps> {
   render() {
      const { commonComponents } = commonI18n as any
      const { onClickAddButton, onClickSaveButton } = this.props
      return (
         <ButtonsContainer>
            <AddButton onClickAddButton={onClickAddButton} />
            <Button
               onClickButton={onClickSaveButton}
               backgroundColor={colors.brightBlue}
               textColor={colors.white}
               buttonText={commonComponents.save}
            />
         </ButtonsContainer>
      )
   }
}

export { AddAndSaveButtons }
