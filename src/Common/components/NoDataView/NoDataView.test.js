import React from 'react'
import { render } from '@testing-library/react'

import NoDataView from '.'

describe('NoDataView Tests', () => {
   it('should render no data view', () => {
      const { getByText, getByAltText } = render(<NoDataView />)

      expect(getByText(/no data found!/i)).toBeInTheDocument()
      expect(getByAltText(/empty image/i)).toBeInTheDocument()
   })
})
