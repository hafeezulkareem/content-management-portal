import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'

import { ButtonWithIcon } from './ButtonWithIcon'

export default {
   title: 'common/BackButton'
}

export const backButton = () => (
   <ButtonWithIcon
      iconURL=''
      iconAltText=''
      onClickBackButton={action('Back button is clicked')}
      buttonText={text('Button Text', 'Back to List')}
   />
)

backButton.story = {
   decorators: [withKnobs]
}
