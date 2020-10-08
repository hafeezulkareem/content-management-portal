import React from 'react'

import images from '../../themes/Images'

import { ToastMessageContainer, Message, Icon } from './styledComponents'

interface ToastMessageProps {
   message: string | null
   isError: boolean
}

function ToastMessage(props: ToastMessageProps) {
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
