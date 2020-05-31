import React from 'react'

import { NumberButton } from '../../../Common/components/NumberButton'
import { CircleAddButton } from '../../../Common/components/CircleAddButton'
import { SaveButton } from '../../../Common/components/SaveButton'
import images from '../../../Common/themes/Images'

import i18n from '../../i18n/strings.json'

import {
   HintsContainer,
   ButtonsContainer,
   FormWithSaveButton,
   HintsFormContainer,
   SaveButtonContainer,
   TextLabel,
   TextArea,
   InputField,
   HintsFormHeader,
   HintsTitle,
   RemoveIcon
} from './styledComponents'

class Hints extends React.Component {
   render() {
      const { hints } = i18n
      return (
         <HintsContainer>
            <ButtonsContainer>
               <NumberButton
                  number={1}
                  isActive={true}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  number={2}
                  isActive={false}
                  onClickNumberButton={() => {}}
               />
               <CircleAddButton onClickCircleAddButton={() => {}} />
            </ButtonsContainer>
            <FormWithSaveButton>
               <HintsFormContainer>
                  <HintsFormHeader>
                     <HintsTitle>{hints.hints}</HintsTitle>
                     <RemoveIcon alt='Remove Icon' src={images.close} />
                  </HintsFormHeader>
                  <TextLabel>{hints.title}</TextLabel>
                  <InputField
                     type={hints.titleType}
                     placeholder={hints.titlePlaceholder}
                  />
                  <TextLabel>{hints.description}</TextLabel>
                  <TextArea
                     placeholder={hints.descriptionPlaceholder}
                  ></TextArea>
                  <TextLabel>{hints.order}</TextLabel>
                  <InputField
                     type={hints.orderType}
                     placeholder={hints.orderPlaceholder}
                  />
               </HintsFormContainer>
               <SaveButtonContainer>
                  <SaveButton onClickSaveButton={() => {}} />
               </SaveButtonContainer>
            </FormWithSaveButton>
         </HintsContainer>
      )
   }
}

export { Hints }
