import React from 'react'

import { AddButton } from '../../../common/components/AddButton'
import { SaveButton } from '../../../common/components/SaveButton'
import { CodeEditor } from '../../../common/components/CodeEditor'

import {
   ComponentContainer,
   ButtonsContainer,
   CodeEditorsContainer
} from './styledComponents'

type RoughSolutionProps = {
   programmingLanguage: string
}

// TODO: onChangeProgrammingLanguage and onClickAddButton methods as props
class CodeEditors extends React.Component<RoughSolutionProps> {
   render() {
      const { programmingLanguage } = this.props
      return (
         <ComponentContainer>
            <CodeEditorsContainer>
               <CodeEditor programmingLanguage={programmingLanguage} />
            </CodeEditorsContainer>
            <ButtonsContainer>
               <AddButton onClickAddButton={() => {}} />
               <SaveButton onClickSaveButton={() => {}} />
            </ButtonsContainer>
         </ComponentContainer>
      )
   }
}

export { CodeEditors }
