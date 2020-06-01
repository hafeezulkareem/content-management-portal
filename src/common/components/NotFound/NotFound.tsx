import React from 'react'
import { Link } from 'react-router-dom'

import images from '../../themes/Images'
import i18n from '../../i18n/strings.json'
import { SIGN_IN_PATH } from '../../constants/RouteConstants'

import {
   NotFoundContainer,
   NotFoundErrorImage,
   NotFoundMessageContainer,
   NotFoundErrorIcon,
   GoToHomeButton,
   ErrorIconContainer,
   ErrorMessageContainer,
   ErrorMessageTitle,
   ErrorMessage,
   Break
} from './styledComponents'

class NotFound extends React.Component {
   render() {
      const { notFoundPage } = i18n
      return (
         <NotFoundContainer>
            <NotFoundErrorImage alt='Not Found Image' src={images.notFound} />
            <NotFoundMessageContainer>
               <ErrorIconContainer>
                  <NotFoundErrorIcon
                     alt='Not Found Error Icon'
                     src={images.notFoundError}
                  />
               </ErrorIconContainer>
               <ErrorMessageContainer>
                  <ErrorMessageTitle>{notFoundPage.error404}</ErrorMessageTitle>
                  <ErrorMessage>
                     {notFoundPage.badClientRequest}
                     <Break />
                     {notFoundPage.pleaseTryAfterSomeTime}
                  </ErrorMessage>
               </ErrorMessageContainer>
            </NotFoundMessageContainer>
            <Link to={SIGN_IN_PATH}>
               <GoToHomeButton>{notFoundPage.backToHome}</GoToHomeButton>
            </Link>
         </NotFoundContainer>
      )
   }
}

export { NotFound }
