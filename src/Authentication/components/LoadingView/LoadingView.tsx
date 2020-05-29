import React from 'react'
import Loader from 'react-loader-spinner'

import { LoaderContainer } from './styledComponents'

const LoadingView = () => {
   return (
      <LoaderContainer>
         <Loader type='TailSpin' color='#ffffff' height={20} width={20} />
      </LoaderContainer>
   )
}

export { LoadingView }
