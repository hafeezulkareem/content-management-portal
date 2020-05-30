import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number } from '@storybook/addon-knobs'

import { Pagination } from './Pagination'

export default {
   title: 'Paginator'
}

export const paginator = () => (
   <Pagination
      currentPageNumber={number('Current Page', 1)}
      totalPageCount={number('Total Page Count', 6)}
      onClickPreviousButton={action('Previous button is clicked')}
      onClickNextButton={action('Next button is clicked')}
   />
)

paginator.story = {
   decorators: [withKnobs]
}
