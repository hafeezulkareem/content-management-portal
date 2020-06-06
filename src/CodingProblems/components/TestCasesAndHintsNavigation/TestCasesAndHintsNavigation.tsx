import React from 'react'
import { observer } from 'mobx-react'

import { NumberButton } from '../../../Common/components/NumberButton'
import { CircleAddButton } from '../../../Common/components/CircleAddButton'
import images from '../../../Common/themes/Images'
import commonI18n from '../../../Common/i18n/strings.json'

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
      return buttonsList.map((button, index) => (
         <NumberButton
            key={button.uniqueId}
            number={index + 1}
            uniqueId={button.uniqueId}
            isActive={button.isActive}
            onClickNumberButton={onClickNumberButton}
            onClickRemoveIcon={onClickDeleteButton}
         />
      ))
   }

   render() {
      const { onClickAddButton } = this.props
      const { imageAlts } = commonI18n
      return (
         <ComponentContainer>
            <ButtonsContainer>
               <MoveButton onClick={() => {}}>
                  <Icon
                     alt={imageAlts.leftArrowIcon}
                     src={images.chevronLeft}
                  />
               </MoveButton>
               <NumberButtonsContainer>
                  {this.renderButtons()}
               </NumberButtonsContainer>
               <CircleAddButton onClickCircleAddButton={onClickAddButton} />
               <MoveRightButton onClick={() => {}}>
                  <Icon
                     alt={imageAlts.rightArrowIcon}
                     src={images.chevronRight}
                  />
               </MoveRightButton>
            </ButtonsContainer>
         </ComponentContainer>
      )
   }
}

export { TestCasesAndHintsNavigation }
