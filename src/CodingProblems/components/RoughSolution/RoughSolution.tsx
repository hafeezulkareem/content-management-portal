import React from 'react'
import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'

import { CodeEditor } from '../../../Common/components/CodeEditor'

import i18n from '../../i18n/strings.json'
import { CodingEditorModel } from '../../stores/models/CodingEditorModel'
import { ROUGH_SOLUTION, PREFILLED_CODE } from '../../constants/TabConstants'

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

   setRoughSolutionDataToList = roughSolutions => {
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
         this.setRoughSolutionDataToList(postRoughSolutionAPIResponse)
      } else if (
         this.tabName === PREFILLED_CODE &&
         postPrefilledCodeAPIResponse.length > 0
      ) {
         this.setRoughSolutionDataToList(postPrefilledCodeAPIResponse)
      } else if (roughSolutions.length > 0) {
         this.setRoughSolutionDataToList(roughSolutions)
      } else {
         this.setNewCodeEditor()
      }
      this.previousRoughSolutionsData = new Map()
      this.codeEditorsList.forEach((roughSolution, key) => {
         this.previousRoughSolutionsData.set(key, { ...roughSolution })
      })
   }

   isPreviousDataSameAsPresentData = () => {
      for (const key in toJS(this.codeEditorsList)) {
         if (this.previousRoughSolutionsData.has(key)) {
            if (
               this.previousRoughSolutionsData.get(key).content !==
                  this.codeEditorsList.get(key).content ||
               this.previousRoughSolutionsData
                  .get(key)
                  .programmingLanguage.toLowerCase() !==
                  this.codeEditorsList
                     .get(key)
                     .programmingLanguage.toLowerCase() ||
               this.previousRoughSolutionsData.get(key).fileName !==
                  this.codeEditorsList.get(key).fileName
            ) {
               return false
            }
         } else {
            if (
               '' !== this.codeEditorsList.get(key).content ||
               '' !== this.codeEditorsList.get(key).programmingLanguage ||
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
      this.updateDataStatus()
   }

   onChangeProgrammingLanguage = (updatedProgrammingLanguage, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.programmingLanguage = updatedProgrammingLanguage
      this.initializeErrors()
      this.updateDataStatus()
   }

   onChangeContent = (updatedContent, id) => {
      const currentCodeEditor = this.codeEditorsList.get(id)
      currentCodeEditor.content = updatedContent
      this.initializeErrors()
      this.updateDataStatus()
   }

   onSuccessDeleteRoughSolution = () => {
      const { codingProblemsStore, showToastMessage } = this.props
      const { deleteSuccessMessages } = i18n as any
      const currentCodeEditor = this.codeEditorsList.get(
         this.currentCodeEditorId
      )
      if (this.tabName === ROUGH_SOLUTION) {
         if (this.codeEditorsList.size > 0) {
            codingProblemsStore.postRoughSolutionAPIResponse = codingProblemsStore.postRoughSolutionAPIResponse.filter(
               roughSolution =>
                  roughSolution.roughSolutionId !==
                  currentCodeEditor.roughSolutionId
            )
         } else {
            codingProblemsStore.postRoughSolutionAPIResponse = []
         }
         showToastMessage(
            deleteSuccessMessages.roughSolution,
            false,
            700,
            this.deleteCodeEditor
         )
      } else {
         if (this.codeEditorsList.size > 0) {
            codingProblemsStore.postPrefilledCodeAPIResponse = codingProblemsStore.postPrefilledCodeAPIResponse.filter(
               roughSolution =>
                  roughSolution.roughSolutionId !==
                  currentCodeEditor.roughSolutionId
            )
         } else {
            codingProblemsStore.postPrefilledCodeAPIResponse = []
         }
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
