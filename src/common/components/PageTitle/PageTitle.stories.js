import React from 'react'
import { text, withKnobs } from '@storybook/addon-knobs'

import { PageTitle } from './PageTitle'

export default {
   title: 'common/PageTitle'
}

export const pageTitle = () => <PageTitle title={text('Title', 'Test Cases')} />

pageTitle.story = {
   decorators: [withKnobs]
}
