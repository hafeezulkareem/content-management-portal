import React from 'react'
import Loader from 'react-loader-spinner'

import { LOADING_VIEW_TEST_ID } from '../../constants/IdConstants'

import { LoaderContainer } from './styledComponents'

const LoadingView = () => {
   return (
      <LoaderContainer data-testid={LOADING_VIEW_TEST_ID}>
         <Loader type='TailSpin' color='#ffffff' height={20} width={20} />
      </LoaderContainer>
   )
}

export { LoadingView }
