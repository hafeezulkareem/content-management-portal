import React from 'react'
import { action } from '@storybook/addon-actions'

import { Button } from './Button'

export default {
   title: 'common/SaveButton'
}

export const saveButton = () => (
   <Button onClickSaveButton={action('Save button is clicked')} />
)
