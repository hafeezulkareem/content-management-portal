import React from 'react'
import { observer } from 'mobx-react'

import { SaveButton } from '../../../Common/components/SaveButton'

import i18n from '../../i18n/strings.json'

import {
   FormWithSaveButton,
   HintsFormContainer,
   HintsFormHeader,
   HintsTitle,
   TextLabel,
   InputField,
   TextArea,
   SaveButtonContainer,
   ErrorMessage
} from './styledComponents'

type HintsContentSectionProps = {
   uniqueId: string
   title: string
   onChangeTitle: any
   titleErrorMessage: string | null
   description: string
   onChangeDescription: any
   descriptionErrorMessage: string | null
   order: number | string
   onChangeOrder: any
   orderErrorMessage: string | null
   onClickSaveButton: any
}

@observer
class HintsContentSection extends React.Component<HintsContentSectionProps> {
   render() {
      const { hints } = i18n
      const {
         uniqueId,
         title,
         onChangeTitle,
         titleErrorMessage,
         description,
         onChangeDescription,
         descriptionErrorMessage,
         order,
         onChangeOrder,
         orderErrorMessage,
         onClickSaveButton
      } = this.props
      return (
         <FormWithSaveButton>
            <HintsFormContainer>
               <HintsFormHeader>
                  <HintsTitle>{hints.hints}</HintsTitle>
               </HintsFormHeader>
               <TextLabel>{hints.title}</TextLabel>
               <InputField
                  onChange={event => onChangeTitle(event, uniqueId)}
                  value={title}
                  type={hints.titleType}
                  placeholder={hints.titlePlaceholder}
               />
               {titleErrorMessage && (
                  <ErrorMessage>{titleErrorMessage}</ErrorMessage>
               )}
               <TextLabel>{hints.description}</TextLabel>
               <TextArea
                  onChange={event => onChangeDescription(event, uniqueId)}
                  value={description}
                  placeholder={hints.descriptionPlaceholder}
               ></TextArea>
               {descriptionErrorMessage && (
                  <ErrorMessage>{descriptionErrorMessage}</ErrorMessage>
               )}
               <TextLabel>{hints.order}</TextLabel>
               <InputField
                  onChange={event => onChangeOrder(event, uniqueId)}
                  value={order}
                  type={hints.orderType}
                  placeholder={hints.orderPlaceholder}
               />
               {orderErrorMessage && (
                  <ErrorMessage>{orderErrorMessage}</ErrorMessage>
               )}
            </HintsFormContainer>
            <SaveButtonContainer>
               <SaveButton
                  onClickSaveButton={() => onClickSaveButton(uniqueId)}
               />
            </SaveButtonContainer>
         </FormWithSaveButton>
      )
   }
}

export { HintsContentSection }
