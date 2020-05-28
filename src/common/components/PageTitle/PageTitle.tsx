import React from 'react'

import { PageTitleContainer, PageTitleEl } from './styledComponents'

type PageTitleProps = {
   title: any
}

class PageTitle extends React.Component<PageTitleProps> {
   render() {
      const { title } = this.props
      return (
         <PageTitleContainer>
            <PageTitleEl>{title}</PageTitleEl>
         </PageTitleContainer>
      )
   }
}

export { PageTitle }
