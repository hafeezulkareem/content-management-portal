import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import { CodingProblemItemModel } from '../models/CodingProblemItemModel'

class CodingProblemsStore {
   @observable postStatementAPIStatus
   @observable postStatementAPIError
   @observable postRoughSolutionAPIStatus
   @observable postRoughSolutionAPIError
   @observable getCodingProblemsAPIStatus
   @observable getCodingProblemsAPIError
   codingProblemsAPIService
   codingProblemId
   @observable codingProblemsList

   constructor(service) {
      this.codingProblemsAPIService = service
      this.init()
   }

   @action.bound
   init() {
      this.postStatementAPIStatus = API_INITIAL
      this.postStatementAPIError = null
      this.codingProblemId = null
      this.codingProblemsList = new Map()
   }

   @action.bound
   setStatementAPIStatus(statementAPIStatus) {
      this.postStatementAPIStatus = statementAPIStatus
   }

   @action.bound
   setStatementAPIError(statementAPIError) {
      this.postStatementAPIError = statementAPIError
   }

   @action.bound
   setStatementAPIResponse(statementAPIResponse) {
      const { question_id: questionId } = statementAPIResponse
      this.codingProblemId = questionId
      console.log('ProductId', this.codingProblemId)
   }

   @action.bound
   postProblemStatement(statementData) {
      console.log('Statement Data', statementData)
      const problemStatementPromise = this.codingProblemsAPIService.postProblemStatementAPI(
         statementData
      )

      return bindPromiseWithOnSuccess(problemStatementPromise)
         .to(this.setStatementAPIStatus, this.setStatementAPIResponse)
         .catch(this.setStatementAPIError)
   }

   @action.bound
   setRoughSolutionAPIStatus(roughSolutionAPIStatus) {
      this.postRoughSolutionAPIStatus = roughSolutionAPIStatus
   }

   @action.bound
   setRoughSolutionAPIError(roughSolutionAPIError) {
      this.postRoughSolutionAPIError = roughSolutionAPIError
   }

   @action.bound
   setRoughSolutionAPIResponse(roughSolutionAPIResponse) {
      const { question_id: questionId } = roughSolutionAPIResponse[0]
      this.codingProblemId = questionId
      console.log('Problem Id', this.codingProblemId)
   }

   @action.bound
   postProblemRoughSolution(roughSolutionData) {
      console.log('Rough Solution Data', roughSolutionData)
      const problemRoughSolutionPromise = this.codingProblemsAPIService.postProblemRoughSolutionAPI(
         roughSolutionData
      )
      return bindPromiseWithOnSuccess(problemRoughSolutionPromise)
         .to(this.setRoughSolutionAPIStatus, this.setRoughSolutionAPIResponse)
         .catch(this.setRoughSolutionAPIError)
   }

   @action.bound
   setCodingProblemsAPIStatus(codingProblemsAPIStatus) {
      this.getCodingProblemsAPIStatus = codingProblemsAPIStatus
   }

   @action.bound
   setCodingProblemsAPIError(codingProblemsAPIError) {
      this.getCodingProblemsAPIError = codingProblemsAPIError
   }

   @action.bound
   setCodingProblemsAPIResponse(codingProblemsAPIResponse) {
      const { questions_list: codingProblems } = codingProblemsAPIResponse
      codingProblems.forEach(codingProblem => {
         this.codingProblemsList.set(
            codingProblem.question_id,
            new CodingProblemItemModel(codingProblem)
         )
      })
   }

   @action.bound
   getCodingProblems() {
      const codingProblemsPromise = this.codingProblemsAPIService.getCodingProblemsAPI()
      return bindPromiseWithOnSuccess(codingProblemsPromise)
         .to(this.setCodingProblemsAPIStatus, this.setCodingProblemsAPIResponse)
         .catch(this.setCodingProblemsAPIError)
   }
}

export { CodingProblemsStore }
