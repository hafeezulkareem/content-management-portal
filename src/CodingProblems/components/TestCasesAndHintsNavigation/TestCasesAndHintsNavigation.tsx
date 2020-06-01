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
      return buttonsList.map(button => (
         <NumberButton
            key={button.number}
            number={button.number}
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
            <MoveButton onClick={() => {}}>
               <Icon alt='Left Arrow Icon' src={images.chevronLeft} />
            </MoveButton>
            <ButtonsContainer>
               <NumberButtonsContainer>
                  {this.renderButtons()}
               </NumberButtonsContainer>
               <CircleAddButton onClickCircleAddButton={onClickAddButton} />
            </ButtonsContainer>
            <MoveRightButton onClick={() => {}}>
               <Icon alt='Right Arrow Icon' src={images.chevronRight} />
            </MoveRightButton>
         </ComponentContainer>
      )
   }
}

export { TestCasesAndHintsNavigation }
