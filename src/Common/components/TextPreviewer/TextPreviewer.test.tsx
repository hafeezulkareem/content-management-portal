import React from 'react'
import { render } from '@testing-library/react'

import { TextPreviewer } from './TextPreviewer'

describe('Text Previewer Tests', () => {
   it('should render given text', () => {
      const { getByText } = render(<TextPreviewer text='Javascript' />)

      expect(getByText(/javascript/i)).toBeInTheDocument()
   })
})
