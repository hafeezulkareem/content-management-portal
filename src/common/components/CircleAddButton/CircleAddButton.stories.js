import React from 'react'
import { action } from '@storybook/addon-actions'

import { CircleAddButton } from './CircleAddButton'

export default {
   title: 'common/CircleAddButton'
}

export const circleAddButton = () => (
   <CircleAddButton
      onClickCircleAddButton={action('Circle add button is clicked')}
   />
)
