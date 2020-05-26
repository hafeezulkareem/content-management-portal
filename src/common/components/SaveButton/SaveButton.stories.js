import React from 'react'
import { action } from '@storybook/addon-actions'

import { SaveButton } from './SaveButton'

export default {
   title: 'common/SaveButton'
}

export const saveButton = () => (
   <SaveButton onClickSaveButton={action('Save button is clicked')} />
)
