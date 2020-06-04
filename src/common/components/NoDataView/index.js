import React from 'react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import {
   NoDataViewContainer,
   ImageContainer,
   NoDataImage,
   NoDataViewText
} from './styledComponents'

class NoDataView extends React.Component {
   render() {
      const { imageAlts } = i18n
      return (
         <NoDataViewContainer>
            <ImageContainer>
               <NoDataImage alt={imageAlts.noData} src={images.noData} />
            </ImageContainer>
            <NoDataViewText>No data found!</NoDataViewText>
         </NoDataViewContainer>
      )
   }
}

export default NoDataView
