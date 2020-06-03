import React from 'react'

import images from '../../themes/Images'

import { ToastMessageContainer, Message, Icon } from './styledComponents'

function ToastMessage(props) {
   const { message, isError } = props
   return (
      <>
         <ToastMessageContainer isError={isError}>
            {isError ? (
               <Icon src={images.errorWhite} />
            ) : (
               <Icon src={images.doneCircleWithBgGreen} />
            )}
            <Message>{message}</Message>
         </ToastMessageContainer>
      </>
   )
}

export { ToastMessage }
