import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { NotFound } from './NotFound'

describe('NotFound Tests', () => {
   it('should render not found view', () => {
      const { getByAltText, getByText } = render(
         <Router>
            <NotFound />
         </Router>
      )

      expect(getByAltText(/not found image/i)).toBeInTheDocument()
      expect(getByText(/error 404/i)).toBeInTheDocument()
   })
})
