import React from 'react'

import { AddButton } from '../../../common/components/AddButton'
import { SaveButton } from '../../../common/components/SaveButton'

import { ButtonsContainer } from './styledComponents'

class AddAndSaveButtons extends React.Component {
   render() {
      return (
         <ButtonsContainer>
            <AddButton onClickAddButton={() => {}} />
            <SaveButton onClickSaveButton={() => {}} />
         </ButtonsContainer>
      )
   }
}

export { AddAndSaveButtons }
