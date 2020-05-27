/* eslint-disable react/jsx-no-undef */
import React from 'react'

import { NumberButton } from '../../../common/components/NumberButton'
import { CircleAddButton } from '../../../common/components/CircleAddButton'
import { SaveButton } from '../../../common/components/SaveButton'

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
                     <RemoveIcon
                        alt='Remove Icon'
                        src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/0ad77906-7f0e-4597-a287-6406fd50f3a9.svg'
                     />
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
