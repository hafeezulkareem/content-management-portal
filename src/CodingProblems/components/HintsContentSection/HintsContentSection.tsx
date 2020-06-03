import React from 'react'
import { observer } from 'mobx-react'

import { DropDown } from '../../../Common/components/DropDown'
import commonI18n from '../../../Common/i18n/strings.json'
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
   ErrorMessage,
   TextAreaHeader,
   DescriptionLabel
} from './styledComponents'

type HintsContentSectionProps = {
   uniqueId: string
   title: string
   onChangeTitle: any
   titleErrorMessage: string | null
   descriptionType: string
   onChangeDescriptionType: any
   description: string
   onChangeDescription: any
   descriptionErrorMessage: string | null
   onClickSaveButton: any
}

@observer
class HintsContentSection extends React.Component<HintsContentSectionProps> {
   render() {
      const { hints } = i18n
      const { textEditorTypes } = commonI18n
      const {
         uniqueId,
         title,
         onChangeTitle,
         titleErrorMessage,
         descriptionType,
         onChangeDescriptionType,
         description,
         onChangeDescription,
         descriptionErrorMessage,
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
               <TextAreaHeader>
                  <DescriptionLabel>{hints.description}</DescriptionLabel>
                  <DropDown
                     options={textEditorTypes}
                     defaultOption=''
                     onChangeType={event =>
                        onChangeDescriptionType(event, uniqueId)
                     }
                     selectedOption={descriptionType}
                  />
               </TextAreaHeader>
               <TextArea
                  onChange={event => onChangeDescription(event, uniqueId)}
                  value={description}
                  placeholder={hints.descriptionPlaceholder}
               ></TextArea>

               {descriptionErrorMessage && (
                  <ErrorMessage>{descriptionErrorMessage}</ErrorMessage>
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
