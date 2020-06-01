import React from 'react'
import { observer } from 'mobx-react'

import { NumberButton } from '../../../Common/components/NumberButton'
import { CircleAddButton } from '../../../Common/components/CircleAddButton'
import images from '../../../Common/themes/Images'

import {
   MoveButton,
   Icon,
   ComponentContainer,
   MoveRightButton,
   NumberButtonsContainer,
   ButtonsContainer
} from './styledComponents'

type TestCasesAndHintsNavigationProps = {
   onClickAddButton: any
   buttonsList: any
   onClickNumberButton: any
   onClickDeleteButton: any
}

@observer
class TestCasesAndHintsNavigation extends React.Component<
   TestCasesAndHintsNavigationProps
> {
   renderButtons = () => {
      let { buttonsList, onClickNumberButton, onClickDeleteButton } = this.props
      buttonsList = Array.from(buttonsList.values())
      console.log('ButtonsList', buttonsList)
      return buttonsList.map(button => (
         <NumberButton
            key={button.number}
            number={button.number}
            uniqueId={button.uniqueId}
            isActive={button.isActive}
            onClickNumberButton={onClickNumberButton}
            onClickRemoveIcon={onClickDeleteButton}
         />
      ))
   }

   render() {
      const { onClickAddButton } = this.props
      return (
         <ComponentContainer>
            <ButtonsContainer>
               <MoveButton onClick={() => {}}>
                  <Icon alt='Left Arrow Icon' src={images.chevronLeft} />
               </MoveButton>
               <NumberButtonsContainer>
                  {this.renderButtons()}
               </NumberButtonsContainer>
               <CircleAddButton onClickCircleAddButton={onClickAddButton} />
               <MoveRightButton onClick={() => {}}>
                  <Icon alt='Right Arrow Icon' src={images.chevronRight} />
               </MoveRightButton>
            </ButtonsContainer>
         </ComponentContainer>
      )
   }
}

export { TestCasesAndHintsNavigation }
