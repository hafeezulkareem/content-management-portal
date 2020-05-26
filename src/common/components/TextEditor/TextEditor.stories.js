import React from 'react'
import { action } from '@storybook/addon-actions'

import { TextEditor } from './TextEditor'

export default {
   title: 'common/TextEditor'
}

export const textEditor = () => (
   <TextEditor
      contentType='text'
      onClickAttachFileButton={action('Attach file button is clicked')}
   />
)
