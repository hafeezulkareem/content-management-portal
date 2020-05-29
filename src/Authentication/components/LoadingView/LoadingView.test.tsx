import React from 'react'
import { render } from '@testing-library/react'

import { LOADING_VIEW_TEST_ID } from '../../constants/IdConstants'

import { LoadingView } from './LoadingView'

describe('SignIn LoadingView tests', () => {
   it('should render loader', () => {
      const { getByTestId } = render(<LoadingView />)

      expect(getByTestId(LOADING_VIEW_TEST_ID)).toBeInTheDocument()
   })
})
