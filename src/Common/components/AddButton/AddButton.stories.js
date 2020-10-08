import React from 'react'
import { action } from '@storybook/addon-actions'

import { AddButton } from './AddButton'

export default {
   title: 'common/AddButton'
}

export const addButton = () => (
   <AddButton onClickAddButton={action('Add button is clicked')} />
)
