import React from 'react'
import { render } from '@testing-library/react'

import { MarkdownPreviewer } from './MarkdownPreviewer'

describe('Markdown Previewer Tests', () => {
   it('should render given markdown', () => {
      const { getByText } = render(
         <MarkdownPreviewer markdownText='# Javascript' />
      )

      expect(getByText(/javascript/i)).toBeInTheDocument()
   })
})
