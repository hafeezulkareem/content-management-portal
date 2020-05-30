import React from 'react'

import { ButtonWithIcon } from '../ButtonWithIcon'
import { Pagination } from '../Pagination'

import {
   FooterNavigationContainer,
   PageDetailsContainer,
   PageDetails
} from './styledComponents'

type FooterNavigationProps = {
   buttonText: string
   onClickAddButton: any
}

class FooterNavigation extends React.Component<FooterNavigationProps> {
   render() {
      const { buttonText, onClickAddButton } = this.props
      return (
         <FooterNavigationContainer>
            <ButtonWithIcon
               iconURL='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/0a1f7418-7e42-43f0-b45a-c0c25eeced7c.svg'
               iconAltText='Plus Icon'
               buttonText={buttonText}
               onClickButton={onClickAddButton}
            />
            <PageDetailsContainer>
               <PageDetails>Page 1 of 30</PageDetails>
            </PageDetailsContainer>
            <Pagination />
         </FooterNavigationContainer>
      )
   }
}

export { FooterNavigation }
