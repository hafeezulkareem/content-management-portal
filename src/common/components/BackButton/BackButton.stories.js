import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'

import { BackButton } from './BackButton'

export default {
   title: 'common/BackButton'
}

export const backButton = () => (
   <BackButton
      onClickBackButton={action('Back button is clicked')}
      buttonText={text('Button Text', 'Back to List')}
   />
)

backButton.story = {
   decorators: [withKnobs]
}
