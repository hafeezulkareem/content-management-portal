import React from 'react'
import { action } from '@storybook/addon-actions'

import { TextEditorFooter } from './TextEditorFooter'

export default {
   title: 'common/TextEditorFooter'
}

export const textEditorFooter = () => (
   <TextEditorFooter
      onClickAttachFileButton={action('Attach button is clicked')}
   />
)
