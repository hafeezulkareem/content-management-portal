import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { AddAndSaveButtons } from '../AddAndSaveButtons'

import { ComponentContainer, CodeEditorsContainer } from './styledComponents'
import { CodingEditorModel } from '../../stores/models/CodingEditorModel'
import { CodeEditor } from '../../../common/components/CodeEditor'

@observer
// TODO: onChangeProgrammingLanguage and onClickAddButton methods as props
class CodeEditors extends React.Component {
   @observable codeEditorsList: any = new Map()
   @observable fileName
   @observable programmingLanguage
   @observable content

   constructor(props) {
      super(props)
      this.setNewCodeEditor()
      console.log('Code Editors')
   }

   setNewCodeEditor = () => {
      const randomId = this.getRandomId()
      this.codeEditorsList.set(
         randomId,
         new CodingEditorModel({
            id: randomId,
            programmingLanguage: '',
            fileName: '',
            content: ''
         })
      )
   }

   getRandomId = () => {
      return Math.random().toString()
   }

   renderCodeEditors = () => {
      const codeEditors = Array.from(this.codeEditorsList.values())
      return codeEditors.map((codeEditor: any) => (
         <CodeEditor
            code={codeEditor.content}
            programmingLanguage={codeEditor.programmingLanguage}
            onChangeFileName={() => {}}
            codeEditorId='1'
            fileName=''
            onChangeProgrammingLanguage={() => {}}
            onChangeContent={() => {}}
            onClickDeleteButton={() => {}}
         />
      ))
   }

   onClickAddButton = () => {
      this.setNewCodeEditor()
   }

   render() {
      return (
         <ComponentContainer>
            <CodeEditorsContainer>
               {this.renderCodeEditors()}
               <AddAndSaveButtons
                  onClickAddButton={this.onClickAddButton}
                  onClickSaveButton={() => {}}
               />
            </CodeEditorsContainer>
         </ComponentContainer>
      )
   }
}

export { CodeEditors }
