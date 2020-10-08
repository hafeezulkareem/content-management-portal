import React from 'react'
import { render } from '@testing-library/react'

import { ToastMessage } from './ToastMessage'

describe('ToastMessage Tests', () => {
   it('should render toast message with given text', () => {
      const { getByText } = render(
         <ToastMessage message='This is error' isError={true} />
      )

      expect(getByText(/this is error/i)).toBeInTheDocument()
   })
})
