import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class CodingProblemsStore {
   @observable postStatementAPIStatus
   @observable postStatementAPIError
   codingProblemsAPIService
   codingProblemId

   constructor(service) {
      this.codingProblemsAPIService = service
      this.init()
   }

   @action.bound
   init() {
      this.postStatementAPIStatus = API_INITIAL
      this.postStatementAPIError = null
      this.codingProblemId = null
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
}

export { CodingProblemsStore }
