import React from 'react'
import Loader from 'react-loader-spinner'

import colors from '../../themes/Colors'

import { OverlayLoaderContainer } from './styledComponents'

class OverlayLoader extends React.Component {
   render() {
      return (
         <OverlayLoaderContainer>
            <Loader
               type='Oval'
               color={colors.lightBlueGrey40}
               height={75}
               width={75}
            />
         </OverlayLoaderContainer>
      )
   }
}

export { OverlayLoader }
