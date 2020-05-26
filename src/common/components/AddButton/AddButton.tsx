import React from 'react'

import i18n from '../../i18n/strings.json'

import { AddButtonEl, PlusImage } from './styledComponents'

type AddButtonProps = {
   onClickAddButton: () => void
}

class AddButton extends React.Component<AddButtonProps> {
   render() {
      const { commonComponents } = i18n as any
      const { onClickAddButton } = this.props
      return (
         <AddButtonEl onClick={onClickAddButton}>
            <PlusImage
               alt='Plus Image'
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c951efe9-393e-4416-b8a8-91177f687c8c.svg'
            />
            {commonComponents.add}
         </AddButtonEl>
      )
   }
}

export { AddButton }
