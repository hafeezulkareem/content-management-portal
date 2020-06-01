import React from 'react'

import { NumberButton } from '../../../Common/components/NumberButton'
import { CircleAddButton } from '../../../Common/components/CircleAddButton'
import images from '../../../Common/themes/Images'

import {
   MoveButton,
   Icon,
   ComponentContainer,
   MoveRightButton,
   NumberButtonsContainer
} from './styledComponents'

class TestCasesAndHintsNavigation extends React.Component {
   render() {
      return (
         <ComponentContainer>
            <MoveButton onClick={() => {}}>
               <Icon alt='Left Arrow Icon' src={images.chevronLeft} />
            </MoveButton>
            <NumberButtonsContainer>
               <NumberButton
                  isActive={true}
                  number={1}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  isActive={false}
                  number={2}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  isActive={false}
                  number={3}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  isActive={false}
                  number={4}
                  onClickNumberButton={() => {}}
               />
               <NumberButton
                  isActive={false}
                  number={5}
                  onClickNumberButton={() => {}}
               />
            </NumberButtonsContainer>
            <CircleAddButton onClickCircleAddButton={() => {}} />
            <MoveRightButton onClick={() => {}}>
               <Icon alt='Right Arrow Icon' src={images.chevronRight} />
            </MoveRightButton>
         </ComponentContainer>
      )
   }
}

export { TestCasesAndHintsNavigation }
