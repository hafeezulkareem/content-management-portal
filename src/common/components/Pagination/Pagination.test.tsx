import React from 'react'
import { render } from '@testing-library/react'

import {
   PAGINATION_NEXT_BUTTON_TEST_ID,
   PAGINATION_PREVIOUS_BUTTON_TEST_ID
} from '../../constants/IdConstants'

import { Pagination } from './Pagination'

describe('Paginator component tests', () => {
   it('should render current page and total page numbers', () => {
      const { queryByText } = render(
         <Pagination
            currentPageNumber={1}
            totalPageCount={6}
            onClickPreviousButton={() => {}}
            onClickNextButton={() => {}}
         />
      )

      expect(queryByText(/1/)).toBeInTheDocument()
      expect(queryByText(/6/)).toBeInTheDocument()
   })

   it('should invoke previous and next button click functions', () => {
      const mockPreviousButtonClickFunction = jest.fn()
      const mockNextButtonClickFunction = jest.fn()

      const { getByTestId } = render(
         <Pagination
            currentPageNumber={1}
            totalPageCount={6}
            onClickPreviousButton={mockPreviousButtonClickFunction}
            onClickNextButton={mockNextButtonClickFunction}
         />
      )

      const previousPageButton: HTMLButtonElement = getByTestId(
         PAGINATION_PREVIOUS_BUTTON_TEST_ID
      ) as HTMLButtonElement
      previousPageButton.click()
      expect(mockPreviousButtonClickFunction).toBeCalled()

      const nextPageButton: HTMLButtonElement = getByTestId(
         PAGINATION_NEXT_BUTTON_TEST_ID
      ) as HTMLButtonElement
      nextPageButton.click()
      expect(mockNextButtonClickFunction).toBeCalled()
   })
})
