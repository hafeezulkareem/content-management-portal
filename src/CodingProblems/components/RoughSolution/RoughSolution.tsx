import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { CodeEditor } from '../../../common/components/CodeEditor'

import i18n from '../../i18n/strings.json'
import { CodingEditorModel } from '../../stores/models/CodingEditorModel'

import { AddAndSaveButtons } from '../AddAndSaveButtons'

import {
   RoughSolutionContainer,
   ErrorMessage,
   RoughSolutionsError
} from './styledComponents'

type RoughSolutionProps = {
   codingProblemsStore: any
   onSelectTab: any
   currentTabIndex: number
   updateDataStatus: any
   roughSolutions: any
   codingProblemId: number | null
}

@observer
class RoughSolution extends React.Component<RoughSolutionProps> {
   @observable codeEditorsList: any = new Map()
   @observable errorMessage: string | null = null
   codingProblemId: number | null
   @observable postRoughSolutionError
   @observable deleteRoughSolutionError
   currentCodeEditorId

   constructor(props) {
      super(props)
      this.codingProblemId = null
   }

   componentDidMount() {
      const { roughSolutions, codingProblemId } = this.props
      if (roughSolutions) {
         this.codingProblemId = codingProblemId
         roughSolutions.forEach(roughSolution => {
            const randomId = this.getRandomId()
            this.codeEditorsList.set(
               randomId,
               new CodingEditorModel({
                  id: randomId,
                  roughSolutionId: roughSolution.roughSolutionId,
                  programmingLanguage: roughSolution.language,
                  fileName: roughSolution.fileName,
                  content: roughSolution.solutionContent
               })
            )
         })
      } else {
         this.setNewCodeEditor()
      }
   }

   init = () => {
      this.codeEditorsList = new Map()
      this.initializeErrors()
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
            content: '',
            roughSolutionId: null
         })
      )
   }

   getRandomId = () => {
      return Math.random().toString()
   }

   initializeErrors = () => {
      this.errorMessage = null
      this.postRoughSolutionError = null
      this.deleteRoughSolutionError = null
   }

   onChangeFileName = (updatedValue, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.fileName = updatedValue
      this.initializeErrors()
      this.props.updateDataStatus(updatedValue)
   }

   onChangeProgrammingLanguage = (updatedProgrammingLanguage, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.programmingLanguage = updatedProgrammingLanguage
      this.initializeErrors()
      this.props.updateDataStatus(updatedProgrammingLanguage)
   }

   onChangeContent = (updatedContent, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.content = updatedContent
      this.initializeErrors()
      this.props.updateDataStatus(updatedContent)
   }

   onSuccessDeleteRoughSolution = () => {
      this.deleteCodeEditor(this.currentCodeEditorId)
   }

   onFailureDeleteRoughSolution = () => {
      const { codingProblemsStore } = this.props
      this.deleteRoughSolutionError =
         codingProblemsStore.deleteRoughSolutionAPIError
   }

   deleteCodeEditor = codeEditorId => {
      this.initializeErrors()
      this.codeEditorsList.delete(codeEditorId)
   }

   checkCodingProblemIdAndDelete = roughSolutionId => {
      if (this.codingProblemId) {
         const { codingProblemsStore } = this.props
         const { deleteProblemRoughSolution } = codingProblemsStore
         deleteProblemRoughSolution(
            this.codingProblemId,
            roughSolutionId,
            this.onSuccessDeleteRoughSolution,
            this.onFailureDeleteRoughSolution
         )
      } else {
         this.deleteCodeEditor(this.currentCodeEditorId)
      }
   }

   onClickDeleteButton = (codeEditorId, roughSolutionId) => {
      this.currentCodeEditorId = codeEditorId
      this.checkCodingProblemIdAndDelete(roughSolutionId)
   }

   onClickAddButton = () => {
      this.setNewCodeEditor()
   }

   prepareRoughSolutionsData = () => {
      const roughSolutions: any = []
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
                  rough_solution_id: codeEditorDetails.roughSolutionId
               })
            }
         }
      )
      return roughSolutions
   }

   onSuccessPostRoughSolutions = () => {
      this.init()
      const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
      updateDataStatus(false)
      onSelectTab(currentTabIndex + 1)
   }

   onFailurePostRoughSolutions = () => {
      const { codingProblemsStore } = this.props
      this.postRoughSolutionError =
         codingProblemsStore.postRoughSolutionAPIError
   }

   postRoughSolutions = roughSolutions => {
      const { codingProblemsStore } = this.props
      const { postProblemRoughSolution } = codingProblemsStore
      postProblemRoughSolution(
         {
            question_id: this.codingProblemId,
            rough_solutions: roughSolutions
         },
         this.onSuccessPostRoughSolutions,
         this.onFailurePostRoughSolutions
      )
   }

   onClickSaveButton = () => {
      let roughSolutions
      if (this.codeEditorsList.size !== 0) {
         roughSolutions = this.prepareRoughSolutionsData()
      }
      if (!this.errorMessage) {
         this.postRoughSolutions(roughSolutions)
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
            roughSolutionId={codeEditor.roughSolutionId}
         />
      ))
   }

   render() {
      return (
         <RoughSolutionContainer>
            {this.errorMessage && (
               <ErrorMessage>{this.errorMessage}</ErrorMessage>
            )}
            {this.postRoughSolutionError && (
               <RoughSolutionsError>
                  {this.postRoughSolutionError}
               </RoughSolutionsError>
            )}
            {this.deleteRoughSolutionError && (
               <RoughSolutionsError>
                  {this.deleteRoughSolutionError}
               </RoughSolutionsError>
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
