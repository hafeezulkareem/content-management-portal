import React from 'react'
import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'

import { CodeEditor } from '../../../Common/components/CodeEditor'

import i18n from '../../i18n/strings.json'
import { ROUGH_SOLUTION, PREFILLED_CODE } from '../../constants/TabConstants'
import { RoughSolutionModel } from '../../stores/models/RoughSolutionModel'

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
   tabName: string
   showToastMessage: any
   resetRoughSolutions: any
}

@observer
class RoughSolution extends React.Component<RoughSolutionProps> {
   @observable codeEditorsList: any = new Map()
   errorMessage!: string | null
   currentCodeEditorId
   tabName
   previousRoughSolutionsData: any

   constructor(props) {
      super(props)
      this.tabName = props.tabName
   }

   setRoughSolutionDataToList = (roughSolutions, isItPreviousData) => {
      const { codingProblemsStore } = this.props
      let idKey = 'rough_solution_id'
      roughSolutions.forEach(roughSolution => {
         if (isItPreviousData) {
            if (this.tabName === ROUGH_SOLUTION) {
               codingProblemsStore.postRoughSolutionAPIResponse.push(
                  roughSolution
               )
               idKey = 'rough_solution_id'
            } else {
               codingProblemsStore.postPrefilledCodeAPIResponse.push(
                  roughSolution
               )
               idKey = 'prefilled_code_id'
            }
         }
         this.codeEditorsList.set(
            roughSolution.uniqueId,
            new RoughSolutionModel({
               uniqueId: roughSolution.uniqueId,
               roughSolutionDetails: {
                  language: roughSolution.language,
                  solution_content: roughSolution.solutionContent,
                  file_name: roughSolution.fileName,
                  [idKey]: roughSolution.id
               }
            })
         )
      })
   }

   componentDidMount() {
      const {
         roughSolutions,
         codingProblemsStore: {
            postRoughSolutionAPIResponse,
            postPrefilledCodeAPIResponse
         }
      } = this.props
      if (
         this.tabName === ROUGH_SOLUTION &&
         postRoughSolutionAPIResponse.length > 0
      ) {
         this.setRoughSolutionDataToList(postRoughSolutionAPIResponse, false)
      } else if (
         this.tabName === PREFILLED_CODE &&
         postPrefilledCodeAPIResponse.length > 0
      ) {
         this.setRoughSolutionDataToList(postPrefilledCodeAPIResponse, false)
      } else if (roughSolutions.length > 0) {
         this.setRoughSolutionDataToList(roughSolutions, true)
      } else {
         this.setNewCodeEditor()
      }
      this.previousRoughSolutionsData = new Map()
      this.codeEditorsList.forEach((roughSolution, key) => {
         this.previousRoughSolutionsData.set(key, { ...roughSolution })
      })
   }

   componentWillUnmount() {
      const { resetRoughSolutions } = this.props
      resetRoughSolutions()
   }

   isPreviousDataSameAsPresentData = () => {
      for (const key in toJS(this.codeEditorsList)) {
         if (this.previousRoughSolutionsData.has(key)) {
            if (
               this.previousRoughSolutionsData.get(key).solutionContent !==
                  this.codeEditorsList.get(key).solutionContent ||
               this.previousRoughSolutionsData
                  .get(key)
                  .language.toLowerCase() !==
                  this.codeEditorsList.get(key).language.toLowerCase() ||
               this.previousRoughSolutionsData.get(key).fileName !==
                  this.codeEditorsList.get(key).fileName
            ) {
               return false
            }
         } else {
            if (
               '' !== this.codeEditorsList.get(key).solutionContent ||
               '' !== this.codeEditorsList.get(key).language ||
               '' !== this.codeEditorsList.get(key).fileName
            ) {
               return false
            }
         }
      }
      return true
   }

   updateDataStatus = () => {
      const { updateDataStatus } = this.props
      if (this.isPreviousDataSameAsPresentData()) {
         updateDataStatus(true)
      } else {
         updateDataStatus(false)
      }
   }

   init = () => {
      this.codeEditorsList = new Map()
      this.initializeErrors()
      this.setNewCodeEditor()
   }

   setNewCodeEditor = () => {
      const uniqueId = this.getRandomId()
      const idKey =
         this.tabName === ROUGH_SOLUTION
            ? 'rough_solution_id'
            : 'prefilled_code_id'
      this.codeEditorsList.set(
         uniqueId,
         new RoughSolutionModel({
            uniqueId,
            roughSolutionDetails: {
               language: '',
               solution_content: '',
               file_name: '',
               [idKey]: null
            }
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
      this.updateDataStatus()
   }

   onChangeProgrammingLanguage = (updatedProgrammingLanguage, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.language = updatedProgrammingLanguage
      this.initializeErrors()
      this.updateDataStatus()
   }

   onChangeContent = (updatedContent, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.solutionContent = updatedContent
      this.initializeErrors()
      this.updateDataStatus()
   }

   onSuccessDeleteRoughSolution = () => {
      const { showToastMessage } = this.props
      const { deleteSuccessMessages } = i18n as any

      if (this.tabName === ROUGH_SOLUTION) {
         showToastMessage(
            deleteSuccessMessages.roughSolution,
            false,
            700,
            this.deleteCodeEditor
         )
      } else {
         showToastMessage(
            deleteSuccessMessages.prefilledCode,
            false,
            700,
            this.deleteCodeEditor
         )
      }
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
      const { codingProblemsStore } = this.props
      const currentCodeEditor = this.codeEditorsList.get(
         this.currentCodeEditorId
      )
      if (this.tabName === ROUGH_SOLUTION) {
         if (this.codeEditorsList.size > 0) {
            codingProblemsStore.postRoughSolutionAPIResponse = codingProblemsStore.postRoughSolutionAPIResponse.filter(
               roughSolution => {
                  return roughSolution.id !== currentCodeEditor.id
               }
            )
         } else {
            codingProblemsStore.postRoughSolutionAPIResponse = []
         }
      } else {
         if (this.codeEditorsList.size > 0) {
            codingProblemsStore.postPrefilledCodeAPIResponse = codingProblemsStore.postPrefilledCodeAPIResponse.filter(
               roughSolution => roughSolution.id !== currentCodeEditor.id
            )
         } else {
            codingProblemsStore.postPrefilledCodeAPIResponse = []
         }
      }
      this.initializeErrors()
      this.codeEditorsList.delete(this.currentCodeEditorId)
   }

   checkCodingProblemIdAndDelete = roughSolutionId => {
      if (roughSolutionId !== null) {
         const {
            codingProblemsStore: {
               deleteProblemRoughSolution,
               deleteProblemPrefilledCode
            }
         } = this.props
         if (this.tabName === ROUGH_SOLUTION) {
            deleteProblemRoughSolution(
               roughSolutionId,
               this.onSuccessDeleteRoughSolution,
               this.onFailureDeleteRoughSolution
            )
         } else {
            deleteProblemPrefilledCode(
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
               !codeEditorDetails.language ||
               !codeEditorDetails.solutionContent
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
                     language: codeEditorDetails.language.toUpperCase(),
                     solution_content: codeEditorDetails.solutionContent,
                     file_name: codeEditorDetails.fileName,
                     rough_solution_id: codeEditorDetails.id
                  })
               } else {
                  roughSolutions.push({
                     language: codeEditorDetails.language.toUpperCase(),
                     solution_content: codeEditorDetails.solutionContent,
                     file_name: codeEditorDetails.fileName,
                     prefilled_code_id: codeEditorDetails.id
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
      updateDataStatus(true)
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
      const {
         codingProblemsStore: {
            postProblemRoughSolution,
            postProblemPrefilledCode
         }
      } = this.props
      if (this.tabName === ROUGH_SOLUTION) {
         postProblemRoughSolution(
            roughSolutions,
            this.onSuccessPostRoughSolutions,
            this.onFailurePostRoughSolutions
         )
      } else {
         postProblemPrefilledCode(
            roughSolutions,
            this.onSuccessPostRoughSolutions,
            this.onFailurePostRoughSolutions
         )
      }
   }

   onClickSaveButton = () => {
      const {
         codingProblemsStore: { codingProblemId },
         showToastMessage
      } = this.props
      if (codingProblemId !== null) {
         let roughSolutions
         if (this.codeEditorsList.size !== 0) {
            roughSolutions = this.prepareRoughSolutionsData()
         }
         if (!this.errorMessage) {
            this.postRoughSolutions(roughSolutions)
         }
      } else {
         const { updateDataStatus } = this.props
         updateDataStatus(true)
         const { firstCreateTheStatement } = i18n
         showToastMessage(firstCreateTheStatement, true, 1500, () => {})
      }
   }

   renderCodeEditors = () => {
      const codeEditors = Array.from(this.codeEditorsList.values())
      return codeEditors.map((codeEditor: any) => (
         <CodeEditor
            key={codeEditor.uniqueId}
            code={codeEditor.solutionContent}
            programmingLanguage={codeEditor.language}
            onChangeFileName={this.onChangeFileName}
            codeEditorId={codeEditor.uniqueId}
            fileName={codeEditor.fileName}
            onChangeProgrammingLanguage={this.onChangeProgrammingLanguage}
            onChangeContent={this.onChangeContent}
            onClickDeleteButton={this.onClickDeleteButton}
            roughSolutionId={codeEditor.id}
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
