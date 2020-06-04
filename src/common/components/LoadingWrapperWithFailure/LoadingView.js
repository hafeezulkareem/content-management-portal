import React from 'react'
import Loader from 'react-loader-spinner'

import { LOADING_WRAPPER_TEST_ID } from '../../constants/IdConstants'
import colors from '../../themes/Colors'

import { LoadingViewContainer } from './styledComponents'

class LoadingView extends React.Component {
   render() {
      return (
         <LoadingViewContainer data-testid={LOADING_WRAPPER_TEST_ID}>
            <Loader
               type='Oval'
               color={colors.brightBlue}
               height={50}
               width={50}
            />
         </LoadingViewContainer>
      )
   }
}

export default LoadingView
