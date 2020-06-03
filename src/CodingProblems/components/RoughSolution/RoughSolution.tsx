import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { CodeEditor } from '../../../Common/components/CodeEditor'

import i18n from '../../i18n/strings.json'
import { CodingEditorModel } from '../../stores/models/CodingEditorModel'
import { ROUGH_SOLUTION } from '../../constants/TabConstants'

import { AddAndSaveButtons } from '../AddAndSaveButtons'

import {
   RoughSolutionContainer,
   CodeEditorsContainer,
   RoughSolutionsWrapper
} from './styledComponents'

type RoughSolutionProps = {
   codingProblemsStore: any
   onSelectTab: any
   currentTabIndex: number
   updateDataStatus: any
   roughSolutions: any
   codingProblemId: number | null
   tabName: string
   showToastMessage: any
}

@observer
class RoughSolution extends React.Component<RoughSolutionProps> {
   @observable codeEditorsList: any = new Map()
   errorMessage!: string | null
   codingProblemId: number | null
   currentCodeEditorId
   tabName

   constructor(props) {
      super(props)
      this.tabName = props.tabName
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
      const { showToastMessage } = this.props
      const { deleteSuccessMessages } = i18n as any
      showToastMessage(
         deleteSuccessMessages.roughSolution,
         false,
         700,
         this.deleteCodeEditor
      )
   }

   onFailureDeleteRoughSolution = () => {
      const { codingProblemsStore, showToastMessage } = this.props
      const deleteRoughSolutionError =
         this.tabName === ROUGH_SOLUTION
            ? codingProblemsStore.deleteRoughSolutionAPIError
            : codingProblemsStore.deletePrefilledCodeAPIError
      showToastMessage(deleteRoughSolutionError, true, 1500, () => {})
   }

   deleteCodeEditor = () => {
      this.initializeErrors()
      this.codeEditorsList.delete(this.currentCodeEditorId)
   }

   checkCodingProblemIdAndDelete = roughSolutionId => {
      if (this.codingProblemId) {
         const { codingProblemsStore } = this.props
         if (this.tabName === ROUGH_SOLUTION) {
            codingProblemsStore.deleteProblemRoughSolution(
               this.codingProblemId,
               roughSolutionId,
               this.onSuccessDeleteRoughSolution,
               this.onFailureDeleteRoughSolution
            )
         } else {
            codingProblemsStore.deleteProblemPrefilledCode(
               this.codingProblemId,
               roughSolutionId,
               this.onSuccessDeleteRoughSolution,
               this.onFailureDeleteRoughSolution
            )
         }
      } else {
         this.deleteCodeEditor()
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
         (codeEditorDetails: any, index) => {
            if (
               !codeEditorDetails.fileName ||
               !codeEditorDetails.programmingLanguage ||
               !codeEditorDetails.content
            ) {
               const {
                  roughSolution: { errors },
                  codeEditor
               } = i18n
               this.errorMessage = `${
                  errors.fillAllTheFieldsIn
               } ${codeEditor} ${index + 1}`
               const { showToastMessage } = this.props
               showToastMessage(this.errorMessage, true, 1500, () => {})
            } else {
               if (this.tabName === ROUGH_SOLUTION) {
                  roughSolutions.push({
                     language: codeEditorDetails.programmingLanguage.toUpperCase(),
                     solution_content: codeEditorDetails.content,
                     file_name: codeEditorDetails.fileName,
                     rough_solution_id: codeEditorDetails.roughSolutionId
                  })
               } else {
                  roughSolutions.push({
                     language: codeEditorDetails.programmingLanguage.toUpperCase(),
                     solution_content: codeEditorDetails.content,
                     file_name: codeEditorDetails.fileName,
                     prefilled_code_id: codeEditorDetails.roughSolutionId
                  })
               }
            }
         }
      )
      return roughSolutions
   }

   moveToNextTab = () => {
      this.init()
      const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
      updateDataStatus(false)
      onSelectTab(currentTabIndex + 1)
   }

   onSuccessPostRoughSolutions = () => {
      const { showToastMessage } = this.props
      const { postSuccessMessages } = i18n as any
      showToastMessage(
         postSuccessMessages.roughSolutions,
         false,
         700,
         this.moveToNextTab
      )
   }

   onFailurePostRoughSolutions = () => {
      const { codingProblemsStore, showToastMessage } = this.props
      const postRoughSolutionError =
         this.tabName === ROUGH_SOLUTION
            ? codingProblemsStore.postRoughSolutionAPIError
            : codingProblemsStore.postPrefilledCodeAPIError
      showToastMessage(postRoughSolutionError, true, 1500, () => {})
   }

   postRoughSolutions = roughSolutions => {
      const { codingProblemsStore } = this.props
      if (this.tabName === ROUGH_SOLUTION) {
         codingProblemsStore.postProblemRoughSolution(
            {
               question_id: this.codingProblemId,
               rough_solutions: roughSolutions
            },
            this.onSuccessPostRoughSolutions,
            this.onFailurePostRoughSolutions
         )
      } else {
         codingProblemsStore.postProblemPrefilledCode(
            {
               question_id: this.codingProblemId,
               prefilled_codes: roughSolutions
            },
            this.onSuccessPostRoughSolutions,
            this.onFailurePostRoughSolutions
         )
      }
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
            <RoughSolutionsWrapper>
               <CodeEditorsContainer>
                  {this.renderCodeEditors()}
               </CodeEditorsContainer>
               <AddAndSaveButtons
                  onClickAddButton={this.onClickAddButton}
                  onClickSaveButton={this.onClickSaveButton}
               />
            </RoughSolutionsWrapper>
         </RoughSolutionContainer>
      )
   }
}

export { RoughSolution }
