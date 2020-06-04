import React from 'react'
import { observer } from 'mobx-react'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'

import {
   FailureViewContainer,
   ImageContainer,
   FailureImage,
   FailureViewMessage,
   RetryButton
} from './styledComponents'

@observer
class FailureView extends React.Component {
   render() {
      const { imageAlts } = i18n
      const { onRetryClick, errorMessage } = this.props
      return (
         <FailureViewContainer>
            <ImageContainer>
               <FailureImage
                  alt={imageAlts.failureImage}
                  src={images.serverDown}
               />
            </ImageContainer>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureViewContainer>
      )
   }
}

export default FailureView
