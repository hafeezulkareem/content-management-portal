import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import { CodingProblemItemModel } from '../models/CodingProblemItemModel'
import { CodingProblemDetailsModel } from '../models/CodingProblemDetailsModel'

class CodingProblemsStore {
   @observable postStatementAPIStatus
   @observable postStatementAPIError
   @observable postRoughSolutionAPIStatus
   @observable postRoughSolutionAPIError
   @observable getCodingProblemsAPIStatus
   @observable getCodingProblemsAPIError
   @observable getCodingProblemDetailsAPIStatus
   @observable getCodingProblemDetailsAPIError
   codingProblemsAPIService
   codingProblemId
   @observable codingProblemsList
   @observable codingProblemDetails: object | undefined

   constructor(service) {
      this.codingProblemsAPIService = service
      this.init()
   }

   @action.bound
   init() {
      this.postStatementAPIStatus = API_INITIAL
      this.postStatementAPIError = null
      this.postRoughSolutionAPIStatus = API_INITIAL
      this.postRoughSolutionAPIError = null
      this.getCodingProblemsAPIStatus = API_INITIAL
      this.getCodingProblemsAPIError = null
      this.getCodingProblemDetailsAPIStatus = API_INITIAL
      this.getCodingProblemDetailsAPIError = null
      this.codingProblemId = null
      this.codingProblemsList = new Map()
      this.codingProblemDetails = undefined
   }

   getRandomId() {
      return Math.random().toString()
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
   }

   @action.bound
   postProblemStatement(statementData) {
      console.log('Statement', statementData)
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
   }

   @action.bound
   postProblemRoughSolution(roughSolutionData) {
      console.log('Rough Solution', roughSolutionData)
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
      this.codingProblemsList = new Map()
      const { questions_list: codingProblems } = codingProblemsAPIResponse
      codingProblems.forEach(codingProblem => {
         const randomId = this.getRandomId()
         this.codingProblemsList.set(
            randomId,
            new CodingProblemItemModel(codingProblem, randomId)
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

   @action.bound
   setCodingProblemDetailsAPIStatus(codingProblemDetailsAPIStatus) {
      this.getCodingProblemDetailsAPIStatus = codingProblemDetailsAPIStatus
   }

   @action.bound
   setCodingProblemDetailsAPIError(codingProblemDetailsAPIError) {
      this.getCodingProblemDetailsAPIError = codingProblemDetailsAPIError
   }

   @action.bound
   setCodingProblemDetailsAPIResponse(codingProblemDetailsAPIResponse) {
      this.codingProblemDetails = new CodingProblemDetailsModel(
         codingProblemDetailsAPIResponse
      )
   }

   @action.bound
   getCodingProblemDetails() {
      const codingProblemDetailsPromise = this.codingProblemsAPIService.getCodingProblemDetailsAPI()
      return bindPromiseWithOnSuccess(codingProblemDetailsPromise)
         .to(
            this.setCodingProblemDetailsAPIStatus,
            this.setCodingProblemDetailsAPIResponse
         )
         .catch(this.setCodingProblemDetailsAPIError)
   }
}

export { CodingProblemsStore }
