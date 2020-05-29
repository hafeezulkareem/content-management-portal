import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { CodeEditor } from '../../../common/components/CodeEditor'

import i18n from '../../i18n/strings.json'
import { AddAndSaveButtons } from '../AddAndSaveButtons'
import { CodingEditorModel } from '../../stores/models/CodingEditorModel'

import { RoughSolutionContainer, ErrorMessage } from './styledComponents'

type RoughSolutionProps = {
   codingProblemsStore: any
   onSelectTab: any
   currentTabIndex: number
   updateDataStatus: any
}

@observer
class RoughSolution extends React.Component<RoughSolutionProps> {
   @observable codeEditorsList: any = new Map()
   @observable errorMessage: string | null = null

   constructor(props) {
      super(props)
      this.setNewCodeEditor()
   }

   init = () => {
      this.codeEditorsList = new Map()
      this.errorMessage = null
      this.setNewCodeEditor()
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

   onChangeFileName = (updatedValue, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.fileName = updatedValue
      this.errorMessage = null
      this.props.updateDataStatus(updatedValue)
   }

   onChangeProgrammingLanguage = (updatedProgrammingLanguage, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.programmingLanguage = updatedProgrammingLanguage
      this.errorMessage = null
      this.props.updateDataStatus(updatedProgrammingLanguage)
   }

   onChangeContent = (updatedContent, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.content = updatedContent
      this.errorMessage = null
      this.props.updateDataStatus(updatedContent)
   }

   onClickDeleteButton = id => {
      this.errorMessage = null
      this.codeEditorsList.delete(id)
   }

   onClickAddButton = () => {
      this.setNewCodeEditor()
   }

   onClickSaveButton = () => {
      const { codingProblemsStore } = this.props
      const { postProblemRoughSolution } = codingProblemsStore
      const roughSolutions: any = []
      if (this.codeEditorsList.size !== 0) {
         Array.from(this.codeEditorsList.values()).forEach(
            (codeEditorDetails: any) => {
               if (
                  !codeEditorDetails.fileName ||
                  !codeEditorDetails.programmingLanguage ||
                  !codeEditorDetails.content
               ) {
                  const { errors } = i18n.roughSolution
                  this.errorMessage = errors.fillAllTheFields
               } else {
                  roughSolutions.push({
                     language: codeEditorDetails.programmingLanguage.toUpperCase(),
                     solution_content: codeEditorDetails.content,
                     file_name: codeEditorDetails.fileName,
                     rough_solution_id: null
                  })
                  console.log(codeEditorDetails.content)
               }
            }
         )
      }
      if (!this.errorMessage) {
         postProblemRoughSolution(roughSolutions)
         this.init()
         const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
         updateDataStatus(false)
         onSelectTab(currentTabIndex + 1)
      }
   }

   renderCodeEditors = () => {
      const codeEditors = Array.from(this.codeEditorsList.values())
      return codeEditors.map((codeEditor: any) => (
         <CodeEditor
            key={codeEditor.id}
            code={codeEditor.content}
            programmingLanguage={codeEditor.programmingLanguage}
            onChangeFileName={this.onChangeFileName}
            codeEditorId={codeEditor.id}
            fileName={codeEditor.fileName}
            onChangeProgrammingLanguage={this.onChangeProgrammingLanguage}
            onChangeContent={this.onChangeContent}
            onClickDeleteButton={this.onClickDeleteButton}
         />
      ))
   }

   render() {
      return (
         <RoughSolutionContainer>
            {this.errorMessage && (
               <ErrorMessage>{this.errorMessage}</ErrorMessage>
            )}
            {this.renderCodeEditors()}
            <AddAndSaveButtons
               onClickAddButton={this.onClickAddButton}
               onClickSaveButton={this.onClickSaveButton}
            />
         </RoughSolutionContainer>
      )
   }
}

export { RoughSolution }
