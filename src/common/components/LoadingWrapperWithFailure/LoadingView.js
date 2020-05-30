import React from 'react'

import { LOADING_WRAPPER_TEST_ID } from '../../constants/IdConstants'

import Loader from '../Icons/Loader'

import { LoadingViewContainer } from './styledComponents'

class LoadingView extends React.Component {
   render() {
      return (
         <LoadingViewContainer data-testid={LOADING_WRAPPER_TEST_ID}>
            <Loader />
         </LoadingViewContainer>
      )
   }
}

export default LoadingView
