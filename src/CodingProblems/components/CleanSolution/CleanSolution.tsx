import React from 'react'
import { observer } from 'mobx-react'
import { observable, ObservableMap } from 'mobx'

import i18n from '../../i18n/strings.json'
import { CleanSolutionModel } from '../../stores/models/CleanSolutionModel'

import { CleanSolutionCodeEditor } from '../CleanSolutionCodeEditor/CleanSolutionCodeEditor'
import { AddAndSaveButtons } from '../AddAndSaveButtons'

import { CleanSolutionContainer, ErrorMessage } from './styledComponents'

type CleanSolutionProps = {
   codingProblemsStore: any
   cleanSolutions: any
   onSelectTab: any
   currentTabIndex: number
}

@observer
class CleanSolution extends React.Component<CleanSolutionProps> {
   @observable codeEditorsList!: ObservableMap<any, any>
   @observable errorMessage!: string | null
   codingProblemId!: number | null
   currentCodeEditorId

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

   componentDidMount() {
      const {
         cleanSolutions,
         codingProblemsStore: { codingProblemId }
      } = this.props
      if (cleanSolutions) {
         this.codingProblemId = codingProblemId
         cleanSolutions.forEach(cleanSolution => {
            this.codeEditorsList.set(cleanSolution.uniqueId, cleanSolution)
         })
      } else {
         this.generateCodeEditor()
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
   }

   onChangeLanguage = (event, uniqueId) => {
      const currentCodeEditor = this.codeEditorsList.get(uniqueId)
      currentCodeEditor.language = event.target.value
      this.initErrors()
   }

   onChangeSolutionContent = (solutionContent, uniqueId) => {
      const currentCodeEditor = this.codeEditorsList.get(uniqueId)
      currentCodeEditor.solutionContent = solutionContent
      this.initErrors()
   }

   onSuccessCleanSolutionDelete = () => {
      this.deleteCodeEditor(this.currentCodeEditorId)
   }

   onFailureCleanSolutionDelete = () => {
      const {
         codingProblemsStore: { deleteCleanSolutionAPIError }
      } = this.props
      this.errorMessage = deleteCleanSolutionAPIError
   }

   checkCodingProblemIdAndDelete = uniqueId => {
      if (this.codingProblemId) {
         const {
            codingProblemsStore: { deleteProblemRoughSolution }
         } = this.props
         const currentCodingEditor = this.codeEditorsList.get(uniqueId)
         deleteProblemRoughSolution(
            this.codingProblemId,
            currentCodingEditor.id,
            this.onSuccessCleanSolutionDelete,
            this.onFailureCleanSolutionDelete
         )
      } else {
         this.deleteCodeEditor(this.currentCodeEditorId)
      }
   }

   deleteCodeEditor = uniqueId => {
      this.codeEditorsList.delete(uniqueId)
   }

   onClickDeleteButton = uniqueId => {
      this.currentCodeEditorId = uniqueId
      this.checkCodingProblemIdAndDelete(uniqueId)
   }

   prepareCleanSolutionsData = () => {
      const cleanSolutions: any = []
      Array.from(this.codeEditorsList.values()).forEach((codeEditor: any) => {
         if (
            !codeEditor.fileName ||
            !codeEditor.language ||
            !codeEditor.solutionContent
         ) {
            const {
               cleanSolution: { errors }
            } = i18n
            this.errorMessage = errors.fillAllTheFields
         } else {
            cleanSolutions.push({
               language: codeEditor.language.toUpperCase(),
               solution_content: codeEditor.solutionContent,
               file_name: codeEditor.fileName,
               clean_solution_id: codeEditor.id
            })
         }
      })
      return cleanSolutions
   }

   onSuccessPostCleanSolutions = () => {
      this.init()
      const { onSelectTab, currentTabIndex } = this.props
      onSelectTab(currentTabIndex + 1)
   }

   onFailurePostCleanSolutions = () => {
      const {
         codingProblemsStore: { postCleanSolutionAPIError }
      } = this.props
      this.errorMessage = postCleanSolutionAPIError
   }

   postCleanSolutions = cleanSolutions => {
      const {
         codingProblemsStore: { postCleanSolution }
      } = this.props
      postCleanSolution(
         {
            question_id: this.codingProblemId,
            clean_solutions: cleanSolutions
         },
         this.onSuccessPostCleanSolutions,
         this.onFailurePostCleanSolutions
      )
   }

   onClickSaveButton = () => {
      let cleanSolutions
      if (this.codeEditorsList.size !== 0) {
         cleanSolutions = this.prepareCleanSolutionsData()
      }
      if (!this.errorMessage) {
         this.postCleanSolutions(cleanSolutions)
      }
   }

   render() {
      const codeEditors = Array.from(this.codeEditorsList.values())
      return (
         <CleanSolutionContainer>
            {this.errorMessage && (
               <ErrorMessage>{this.errorMessage}</ErrorMessage>
            )}
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
         </CleanSolutionContainer>
      )
   }
}

export { CleanSolution }
