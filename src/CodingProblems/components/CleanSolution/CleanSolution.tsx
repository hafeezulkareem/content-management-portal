import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap, toJS } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { OverlayLoader } from '../../../Common/components/OverlayLoader'

import i18n from '../../i18n/strings.json'
import { CleanSolutionModel } from '../../stores/models/CleanSolutionModel'

import { CleanSolutionCodeEditor } from '../CleanSolutionCodeEditor/CleanSolutionCodeEditor'
import { AddAndSaveButtons } from '../AddAndSaveButtons'

import {
   CleanSolutionContainer,
   CleanSolutionsWrapper
} from './styledComponents'

type CleanSolutionProps = {
   codingProblemsStore: any
   cleanSolutions: any
   onSelectTab: any
   currentTabIndex: number
   showToastMessage: any
   updateDataStatus: any
   resetCleanSolutions: any
}

@observer
class CleanSolution extends React.Component<CleanSolutionProps> {
   @observable codeEditorsList!: ObservableMap<any, any>
   @observable errorMessage!: string | null
   codingProblemId!: number | null
   currentCodeEditorId
   previousCleanSolutionData: any

   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.codeEditorsList = new ObservableMap(new Map())
      this.codingProblemId = null
      this.currentCodeEditorId = null
      this.initErrors()
   }

   initErrors = () => {
      this.errorMessage = null
   }

   setCleanSolutionDataToList = (cleanSolutions, isItPreviousData) => {
      const { codingProblemsStore } = this.props
      cleanSolutions.forEach(cleanSolution => {
         if (isItPreviousData) {
            codingProblemsStore.postCleanSolutionAPIResponse.push(cleanSolution)
         }
         this.codeEditorsList.set(
            cleanSolution.uniqueId,
            new CleanSolutionModel({
               uniqueId: cleanSolution.uniqueId,
               cleanSolutionDetails: {
                  clean_solution_id: cleanSolution.id,
                  file_name: cleanSolution.fileName,
                  language: cleanSolution.language,
                  solution_content: cleanSolution.solutionContent
               }
            })
         )
      })
   }

   componentDidMount() {
      const {
         cleanSolutions,
         codingProblemsStore: { postCleanSolutionAPIResponse }
      } = this.props
      if (postCleanSolutionAPIResponse.length > 0) {
         this.setCleanSolutionDataToList(postCleanSolutionAPIResponse, false)
      } else if (cleanSolutions.length > 0) {
         this.setCleanSolutionDataToList(cleanSolutions, true)
      } else {
         this.generateCodeEditor()
      }
      this.previousCleanSolutionData = new Map()
      this.codeEditorsList.forEach((cleanSolution, key) => {
         this.previousCleanSolutionData.set(key, { ...cleanSolution })
      })
   }

   componentWillUnmount() {
      const { resetCleanSolutions } = this.props
      resetCleanSolutions()
   }

   isPreviousDataSameAsPresentData = () => {
      for (const key in toJS(this.codeEditorsList)) {
         if (this.previousCleanSolutionData.has(key)) {
            if (
               this.previousCleanSolutionData.get(key).solutionContent !==
                  this.codeEditorsList.get(key).solutionContent ||
               this.previousCleanSolutionData
                  .get(key)
                  .language.toLowerCase() !==
                  this.codeEditorsList.get(key).language.toLowerCase() ||
               this.previousCleanSolutionData.get(key).fileName !==
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

   generateCodeEditor = () => {
      const uniqueId = Math.random().toString()
      this.codeEditorsList.set(
         uniqueId,
         new CleanSolutionModel({
            uniqueId,
            cleanSolutionDetails: {
               clean_solution_id: null,
               file_name: '',
               language: '',
               solution_content: ''
            }
         })
      )
   }

   onChangeFileName = (event, uniqueId) => {
      const currentCodeEditor = this.codeEditorsList.get(uniqueId)
      currentCodeEditor.fileName = event.target.value
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeLanguage = (event, uniqueId) => {
      const currentCodeEditor = this.codeEditorsList.get(uniqueId)
      currentCodeEditor.language = event.target.value
      this.initErrors()
      this.updateDataStatus()
   }

   onChangeSolutionContent = (solutionContent, uniqueId) => {
      const currentCodeEditor = this.codeEditorsList.get(uniqueId)
      currentCodeEditor.solutionContent = solutionContent
      this.initErrors()
      this.updateDataStatus()
   }

   onSuccessCleanSolutionDelete = () => {
      const currentCodeEditor = this.codeEditorsList.get(
         this.currentCodeEditorId
      )
      const { codingProblemsStore, showToastMessage } = this.props
      if (this.codeEditorsList.size > 0) {
         codingProblemsStore.postCleanSolutionAPIResponse = codingProblemsStore.postCleanSolutionAPIResponse.filter(
            codeEditor => codeEditor.id !== currentCodeEditor.id
         )
      } else {
         codingProblemsStore.postCleanSolutionAPIResponse = []
      }
      const { deleteSuccessMessages } = i18n
      showToastMessage(deleteSuccessMessages.cleanSolution, false, 700)
      setTimeout(this.deleteCodeEditor, 800)
   }

   onFailureCleanSolutionDelete = () => {
      const {
         codingProblemsStore: { deleteCleanSolutionAPIError },
         showToastMessage
      } = this.props
      showToastMessage(deleteCleanSolutionAPIError, true, 1500)
   }

   checkCodingProblemIdAndDelete = uniqueId => {
      const currentCodingEditor = this.codeEditorsList.get(uniqueId)
      if (currentCodingEditor.id !== null) {
         const {
            codingProblemsStore: { deleteCleanSolution }
         } = this.props
         deleteCleanSolution(
            currentCodingEditor.id,
            this.onSuccessCleanSolutionDelete,
            this.onFailureCleanSolutionDelete
         )
      } else {
         this.deleteCodeEditor()
      }
   }

   deleteCodeEditor = () => {
      this.codeEditorsList.delete(this.currentCodeEditorId)
      this.updateDataStatus()
   }

   onClickDeleteButton = uniqueId => {
      this.currentCodeEditorId = uniqueId
      this.checkCodingProblemIdAndDelete(uniqueId)
   }

   prepareCleanSolutionsData = () => {
      const cleanSolutions: any = []
      Array.from(this.codeEditorsList.values()).forEach(
         (codeEditor: any, index) => {
            if (
               !codeEditor.fileName ||
               !codeEditor.language ||
               !codeEditor.solutionContent
            ) {
               const {
                  cleanSolution: { errors },
                  codeEditor
               } = i18n
               this.errorMessage = `${
                  errors.fillAllTheFieldsIn
               } ${codeEditor} ${index + 1}`
               const { showToastMessage } = this.props
               showToastMessage(this.errorMessage, true, 1500)
            } else {
               cleanSolutions.push({
                  language: codeEditor.language.toUpperCase(),
                  solution_content: codeEditor.solutionContent,
                  file_name: codeEditor.fileName,
                  clean_solution_id: codeEditor.id
               })
            }
         }
      )
      return cleanSolutions
   }

   moveToNextTab = () => {
      this.init()
      const { onSelectTab, currentTabIndex, updateDataStatus } = this.props
      updateDataStatus(true)
      onSelectTab(currentTabIndex + 1)
   }

   onSuccessPostCleanSolutions = () => {
      const { showToastMessage } = this.props
      const { postSuccessMessages } = i18n
      showToastMessage(postSuccessMessages.cleanSolutions, false, 700)
      setTimeout(this.moveToNextTab, 800)
   }

   onFailurePostCleanSolutions = () => {
      const {
         codingProblemsStore: { postCleanSolutionAPIError },
         showToastMessage
      } = this.props
      showToastMessage(postCleanSolutionAPIError, true, 1500)
   }

   postCleanSolutions = cleanSolutions => {
      const {
         codingProblemsStore: { postCleanSolution }
      } = this.props
      postCleanSolution(
         cleanSolutions,
         this.onSuccessPostCleanSolutions,
         this.onFailurePostCleanSolutions
      )
   }

   onClickSaveButton = () => {
      const {
         codingProblemsStore: { codingProblemId },
         showToastMessage
      } = this.props
      if (codingProblemId !== null) {
         let cleanSolutions
         if (this.codeEditorsList.size !== 0) {
            cleanSolutions = this.prepareCleanSolutionsData()
         }
         if (!this.errorMessage) {
            this.postCleanSolutions(cleanSolutions)
         }
      } else {
         const { updateDataStatus } = this.props
         updateDataStatus(true)
         const { firstCreateTheStatement } = i18n
         showToastMessage(firstCreateTheStatement, true, 1500)
      }
   }

   render() {
      const codeEditors = Array.from(this.codeEditorsList.values())
      const {
         codingProblemsStore: {
            postCleanSolutionAPIStatus,
            deleteCleanSolutionAPIStatus
         }
      } = this.props
      return (
         <CleanSolutionContainer>
            {postCleanSolutionAPIStatus === API_FETCHING ||
            deleteCleanSolutionAPIStatus === API_FETCHING ? (
               <OverlayLoader />
            ) : null}
            <CleanSolutionsWrapper>
               {codeEditors.map(codeEditor => (
                  <CleanSolutionCodeEditor
                     key={codeEditor.uniqueId}
                     uniqueId={codeEditor.uniqueId}
                     fileName={codeEditor.fileName}
                     onChangeFileName={this.onChangeFileName}
                     language={codeEditor.language}
                     onChangeLanguage={this.onChangeLanguage}
                     solutionContent={codeEditor.solutionContent}
                     onChangeSolutionContent={this.onChangeSolutionContent}
                     onClickDeleteButton={this.onClickDeleteButton}
                  />
               ))}
               <AddAndSaveButtons
                  onClickAddButton={this.generateCodeEditor}
                  onClickSaveButton={this.onClickSaveButton}
               />
            </CleanSolutionsWrapper>
         </CleanSolutionContainer>
      )
   }
}

export { CleanSolution }
