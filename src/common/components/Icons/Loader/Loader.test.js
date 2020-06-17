import React from 'react'
import { render } from '@testing-library/react'

import Loader from '.'

describe('Loader Tests', () => {
   it('should render loader', () => {
      render(<Loader />)
   })
})
