import React from 'react'
import { action } from '@storybook/addon-actions'
import { number, withKnobs } from '@storybook/addon-knobs'

import { NumberButton } from './NumberButton'

export default {
   title: 'common/NumberButton'
}

export const numberButton = () => (
   <NumberButton
      isActive={true}
      onClickNumberButton={action('Number button is clicked')}
      number={number('Number', 1)}
   />
)

numberButton.story = {
   decorators: [withKnobs]
}
