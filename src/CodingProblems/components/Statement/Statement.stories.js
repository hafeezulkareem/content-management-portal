import React from 'react'
import { action } from '@storybook/addon-actions'

import { Statement } from './Statement'

export default {
   title: 'CodingProblems/Statement'
}

export const statement = () => (
   <Statement
      text={`# This is markdown header \n\n This is markdown paragraph`}
      textType='markdown'
      onClickAttachFileButton={action('Attach file button is clicked')}
   />
)
