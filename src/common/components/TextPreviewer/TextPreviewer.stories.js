import React from 'react'
import { TextPreviewer } from './TextPreviewer'

export default {
   title: 'common/TextPreviewer'
}

const text = `This is normal text\n\nThis is not normal`

export const textPreviewer = () => <TextPreviewer text={text} />
