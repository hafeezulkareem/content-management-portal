import React from 'react'
import { observer } from 'mobx-react'

import { DropDown } from '../../../Common/components/DropDown'
import commonI18n from '../../../Common/i18n/strings.json'
import { Button } from '../../../Common/components/Button'
import { TextPreviewer } from '../../../Common/components/TextPreviewer'
import { HtmlPreviewer } from '../../../Common/components/HtmlPreviewer'
import { MarkdownPreviewer } from '../../../Common/components/MarkdownPreviewer'
import colors from '../../../Common/themes/Colors'

import i18n from '../../i18n/strings.json'

import {
   HintsContentSectionContainer,
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
   DescriptionLabel,
   HintsPreviewSection,
   HintsFormSection
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
   renderPreviewer = () => {
      const { textEditorTypes } = commonI18n
      const { descriptionType, description } = this.props
      switch (descriptionType.toLowerCase()) {
         case textEditorTypes[0].optionText.toLowerCase():
            return <TextPreviewer text={description} />
         case textEditorTypes[1].optionText.toLowerCase():
            return <HtmlPreviewer htmlText={description} />
         case textEditorTypes[2].optionText.toLowerCase():
            return <MarkdownPreviewer markdownText={description} />
      }
   }

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
         <HintsContentSectionContainer>
            <HintsFormSection>
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
                     <Button
                        onClickButton={() => onClickSaveButton(uniqueId)}
                        backgroundColor={colors.greenishTeal}
                        textColor={colors.white}
                     />
                  </SaveButtonContainer>
               </FormWithSaveButton>
            </HintsFormSection>
            <HintsPreviewSection>{this.renderPreviewer()}</HintsPreviewSection>
         </HintsContentSectionContainer>
      )
   }
}

export { HintsContentSection }
