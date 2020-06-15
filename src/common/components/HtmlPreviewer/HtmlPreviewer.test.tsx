import React from 'react'
import { render } from '@testing-library/react'

import { HtmlPreviewer } from './HtmlPreviewer'

describe('HTML Previewer Tests', () => {
   it('should render given HTML text', () => {
      const { getByTitle } = render(
         <HtmlPreviewer htmlText='<h1>Javascript</h1>' />
      )

      expect(getByTitle(/htmlPreviewer/i).srcdoc).toBe('<h1>Javascript</h1>')
   })
})
