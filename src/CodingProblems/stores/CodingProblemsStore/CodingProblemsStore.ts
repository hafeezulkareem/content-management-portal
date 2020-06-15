import { action, observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import { CodingProblemItemModel } from '../models/CodingProblemItemModel'
import { CodingProblemDetailsModel } from '../models/CodingProblemDetailsModel'
import { StatementModel } from '../models/StatementModel'
import { RoughSolutionModel } from '../models/RoughSolutionModel'
import { TestCaseModel } from '../models/TestCaseModel'
import { SolutionApproachModel } from '../models/SolutionApproachModel'
import { CleanSolutionModel } from '../models/CleanSolutionModel'
import { HintModel } from '../models/HintModel'

class CodingProblemsStore {
   @observable postStatementAPIStatus
   @observable postStatementAPIError
   postStatementAPIResponse
   @observable postRoughSolutionAPIStatus
   @observable postRoughSolutionAPIError
   postRoughSolutionAPIResponse
   @observable deleteRoughSolutionAPIStatus
   @observable deleteRoughSolutionAPIError
   @observable postTestCaseAPIStatus
   @observable postTestCaseAPIError
   postTestCaseAPIResponses
   @observable deleteTestCaseAPIStatus
   @observable deleteTestCaseAPIError
   @observable postPrefilledCodeAPIStatus
   @observable postPrefilledCodeAPIError
   postPrefilledCodeAPIResponse
   @observable deletePrefilledCodeAPIStatus
   @observable deletePrefilledCodeAPIError
   @observable postSolutionApproachAPIStatus
   @observable postSolutionApproachAPIError
   postSolutionApproachAPIResponse
   @observable postCleanSolutionAPIStatus
   @observable postCleanSolutionAPIError
   postCleanSolutionAPIResponse
   @observable deleteCleanSolutionAPIStatus
   @observable deleteCleanSolutionAPIError
   @observable postHintAPIStatus
   @observable postHintAPIError
   postHintAPIResponses
   @observable deleteHintAPIStatus
   @observable deleteHintAPIError
   @observable getCodingProblemsAPIStatus
   @observable getCodingProblemsAPIError
   codingProblemsOffset
   totalCodingProblems
   @observable currentCodingProblemsPage
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
      this.deleteRoughSolutionAPIStatus = API_INITIAL
      this.deleteRoughSolutionAPIError = null
      this.postTestCaseAPIStatus = API_INITIAL
      this.postTestCaseAPIError = null
      this.deleteTestCaseAPIStatus = API_INITIAL
      this.deleteTestCaseAPIError = null
      this.postPrefilledCodeAPIStatus = API_INITIAL
      this.postPrefilledCodeAPIError = null
      this.deletePrefilledCodeAPIStatus = API_INITIAL
      this.deletePrefilledCodeAPIError = null
      this.postSolutionApproachAPIStatus = API_INITIAL
      this.postSolutionApproachAPIError = null
      this.postCleanSolutionAPIStatus = API_INITIAL
      this.postCleanSolutionAPIError = null
      this.deleteCleanSolutionAPIStatus = API_INITIAL
      this.deleteCleanSolutionAPIError = null
      this.postHintAPIStatus = API_INITIAL
      this.postHintAPIError = null
      this.deleteHintAPIStatus = API_INITIAL
      this.deleteHintAPIError = null
      this.getCodingProblemsAPIStatus = API_INITIAL
      this.getCodingProblemsAPIError = null
      this.codingProblemsOffset = 1
      this.currentCodingProblemsPage = 1
      this.totalCodingProblems = 0
      this.getCodingProblemDetailsAPIStatus = API_INITIAL
      this.getCodingProblemDetailsAPIError = null
      this.codingProblemId = null
      this.codingProblemsList = new Map()
      this.codingProblemDetails = undefined
      this.initCodingProblemResponses()
   }

   @action.bound
   initCodingProblemResponses() {
      this.postStatementAPIResponse = null
      this.postRoughSolutionAPIResponse = []
      this.postTestCaseAPIResponses = []
      this.postPrefilledCodeAPIResponse = []
      this.postSolutionApproachAPIResponse = null
      this.postCleanSolutionAPIResponse = []
      this.postHintAPIResponses = []
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
      this.postStatementAPIError = getUserDisplayableErrorMessage(
         statementAPIError
      )
   }

   @action.bound
   setStatementAPIResponse(statementAPIResponse) {
      if (statementAPIResponse) {
         const {
            question_id: questionId,
            short_text,
            problem_description
         } = statementAPIResponse
         this.codingProblemId = questionId
         this.postStatementAPIResponse = new StatementModel({
            short_text,
            problem_description
         })
      }
   }

   @action.bound
   postProblemStatement(
      statementData,
      onSuccessPostProblemStatement,
      onFailurePostProblemStatement
   ) {
      const problemStatementPromise = this.codingProblemsAPIService.postProblemStatementAPI(
         statementData
      )
      return bindPromiseWithOnSuccess(problemStatementPromise)
         .to(this.setStatementAPIStatus, response => {
            this.setStatementAPIResponse(response)
            onSuccessPostProblemStatement()
         })
         .catch(error => {
            this.setStatementAPIError(error)
            onFailurePostProblemStatement()
         })
   }

   @action.bound
   setRoughSolutionAPIStatus(roughSolutionAPIStatus) {
      this.postRoughSolutionAPIStatus = roughSolutionAPIStatus
   }

   @action.bound
   setRoughSolutionAPIError(roughSolutionAPIError) {
      this.postRoughSolutionAPIError = getUserDisplayableErrorMessage(
         roughSolutionAPIError
      )
   }

   @action.bound
   setRoughSolutionAPIResponse(roughSolutionAPIResponse) {
      const { rough_solutions: roughSolutions } = roughSolutionAPIResponse
      if (roughSolutions.length > 0) {
         this.postRoughSolutionAPIResponse = [
            ...roughSolutions.map(roughSolution => {
               const uniqueId = this.getRandomId().toString()
               return new RoughSolutionModel({
                  uniqueId,
                  roughSolutionDetails: roughSolution
               })
            })
         ]
      }
   }

   @action.bound
   postProblemRoughSolution(
      roughSolutionData,
      onSuccessPostRoughSolutions,
      onFailurePostRoughSolutions
   ) {
      const problemRoughSolutionPromise = this.codingProblemsAPIService.postProblemRoughSolutionAPI(
         this.codingProblemId,
         roughSolutionData
      )
      return bindPromiseWithOnSuccess(problemRoughSolutionPromise)
         .to(this.setRoughSolutionAPIStatus, response => {
            this.setRoughSolutionAPIResponse(response)
            onSuccessPostRoughSolutions()
         })
         .catch(error => {
            this.setRoughSolutionAPIError(error)
            onFailurePostRoughSolutions()
         })
   }

   @action.bound
   setRoughSolutionDeleteAPIStatus(roughSolutionDeleteAPIStatus) {
      this.deleteRoughSolutionAPIStatus = roughSolutionDeleteAPIStatus
   }

   @action.bound
   setRoughSolutionDeleteAPIError(roughSolutionDeleteAPIError) {
      this.deleteRoughSolutionAPIError = getUserDisplayableErrorMessage(
         roughSolutionDeleteAPIError
      )
   }

   @action.bound
   deleteProblemRoughSolution(
      roughSolutionId,
      onSuccessDeleteRoughSolution,
      onFailureDeleteRoughSolution
   ) {
      const deleteRoughSolutionPromise = this.codingProblemsAPIService.deleteRoughSolutionAPI(
         this.codingProblemId,
         roughSolutionId
      )
      return bindPromiseWithOnSuccess(deleteRoughSolutionPromise)
         .to(this.setRoughSolutionDeleteAPIStatus, () => {
            onSuccessDeleteRoughSolution()
         })
         .catch(error => {
            this.setRoughSolutionDeleteAPIError(error)
            onFailureDeleteRoughSolution()
         })
   }

   @action.bound
   setTestCaseAPIStatus(testCaseAPIStatus) {
      this.postTestCaseAPIStatus = testCaseAPIStatus
   }

   @action.bound
   setTestCaseAPIError(testCaseAPIError) {
      this.postTestCaseAPIError = getUserDisplayableErrorMessage(
         testCaseAPIError
      )
   }

   @action.bound
   isTestCaseAlreadyPresent(testCaseDetails) {
      let isPresent = false
      if (this.postTestCaseAPIResponses.length > 0) {
         this.postTestCaseAPIResponses.forEach(testCase => {
            if (testCase.number === testCaseDetails.test_case_number) {
               isPresent = true
            }
         })
      }
      return isPresent
   }

   @action.bound
   setTestCaseAPIResponse(testCaseAPIResponse) {
      const { test_case: testCaseDetails } = testCaseAPIResponse
      if (!this.isTestCaseAlreadyPresent(testCaseDetails)) {
         const uniqueId = this.getRandomId()
         this.postTestCaseAPIResponses.push(
            new TestCaseModel({ uniqueId, testCaseDetails })
         )
      }
   }

   @action.bound
   postProblemTestCase(
      testCaseData,
      onSuccessPostTestCase,
      onFailurePostTestCase
   ) {
      const postProblemTestCasePromise = this.codingProblemsAPIService.postProblemTestCaseAPI(
         this.codingProblemId,
         testCaseData
      )
      return bindPromiseWithOnSuccess(postProblemTestCasePromise)
         .to(this.setTestCaseAPIStatus, response => {
            this.setTestCaseAPIResponse(response)
            onSuccessPostTestCase()
         })
         .catch(error => {
            this.setTestCaseAPIError(error)
            onFailurePostTestCase()
         })
   }

   @action.bound
   setTestCaseDeleteAPIStatus(testCaseDeleteAPIStatus) {
      this.deleteTestCaseAPIStatus = testCaseDeleteAPIStatus
   }

   @action.bound
   setTestCaseDeleteAPIError(testCaseDeleteAPIError) {
      this.deleteTestCaseAPIError = getUserDisplayableErrorMessage(
         testCaseDeleteAPIError
      )
   }

   @action.bound
   deleteProblemTestCase(
      testCaseId,
      onSuccessTestCaseDelete,
      onFailureTestCaseDelete
   ) {
      const testCaseDeletePromise = this.codingProblemsAPIService.deleteTestCaseAPI(
         this.codingProblemId,
         testCaseId
      )
      return bindPromiseWithOnSuccess(testCaseDeletePromise)
         .to(this.setTestCaseDeleteAPIStatus, () => {
            onSuccessTestCaseDelete()
         })
         .catch(error => {
            this.setTestCaseDeleteAPIError(error)
            onFailureTestCaseDelete()
         })
   }

   @action.bound
   setPrefilledCodePostAPIStatus(prefilledCodePostAPIStatus) {
      this.postPrefilledCodeAPIStatus = prefilledCodePostAPIStatus
   }

   @action.bound
   setPrefilledCodePostAPIError(prefilledCodePostAPIError) {
      this.postPrefilledCodeAPIError = getUserDisplayableErrorMessage(
         prefilledCodePostAPIError
      )
   }

   @action.bound
   setPrefilledCodeResponse(prefilledCodeResponse) {
      const { prefilled_codes: prefilledCode } = prefilledCodeResponse
      if (prefilledCode.length > 0) {
         this.postPrefilledCodeAPIResponse = [
            ...prefilledCode.map(prefilledCode => {
               const uniqueId = this.getRandomId().toString()
               return new RoughSolutionModel({
                  uniqueId,
                  roughSolutionDetails: prefilledCode
               })
            })
         ]
      }
   }

   @action.bound
   postProblemPrefilledCode(
      prefilledCodeData,
      onSuccessPrefilledCodePost,
      onFailurePrefilledCodePost
   ) {
      const prefilledCodePromise = this.codingProblemsAPIService.postPrefilledCodeAPI(
         this.codingProblemId,
         prefilledCodeData
      )
      return bindPromiseWithOnSuccess(prefilledCodePromise)
         .to(this.setPrefilledCodePostAPIStatus, response => {
            this.setPrefilledCodeResponse(response)
            onSuccessPrefilledCodePost()
         })
         .catch(error => {
            this.setPrefilledCodePostAPIError(error)
            onFailurePrefilledCodePost()
         })
   }

   @action.bound
   setPrefilledCodeDeleteAPIStatus(prefilledCodeDeleteAPIStatus) {
      this.deletePrefilledCodeAPIStatus = prefilledCodeDeleteAPIStatus
   }

   @action.bound
   setPrefilledCodeDeleteAPIError(prefilledCodeDeleteAPIError) {
      this.deletePrefilledCodeAPIError = getUserDisplayableErrorMessage(
         prefilledCodeDeleteAPIError
      )
   }

   @action.bound
   deleteProblemPrefilledCode(
      prefilledCodeId,
      onSuccessPrefilledCodeDelete,
      onFailurePrefilledCodeDelete
   ) {
      const prefilledCodePromise = this.codingProblemsAPIService.deletePrefilledCodeAPI(
         this.codingProblemId,
         prefilledCodeId
      )
      return bindPromiseWithOnSuccess(prefilledCodePromise)
         .to(this.setPrefilledCodeDeleteAPIStatus, () => {
            onSuccessPrefilledCodeDelete()
         })
         .catch(error => {
            this.setPrefilledCodeDeleteAPIError(error)
            onFailurePrefilledCodeDelete()
         })
   }

   @action.bound
   setSolutionApproachAPIStatus(solutionApproachAPIStatus) {
      this.postSolutionApproachAPIStatus = solutionApproachAPIStatus
   }

   @action.bound
   setSolutionApproachAPIError(solutionApproachAPIError) {
      this.postSolutionApproachAPIError = getUserDisplayableErrorMessage(
         solutionApproachAPIError
      )
   }

   @action.bound
   setSolutionApproachAPIResponse(solutionApproachAPIResponse) {
      if (solutionApproachAPIResponse) {
         this.postSolutionApproachAPIResponse = new SolutionApproachModel(
            solutionApproachAPIResponse
         )
      }
   }

   @action.bound
   postProblemSolutionApproach(
      solutionApproachData,
      onSuccessPostSolutionApproach,
      onFailurePostSolutionApproach
   ) {
      const solutionApproachPostPromise = this.codingProblemsAPIService.postSolutionApproachAPI(
         this.codingProblemId,
         solutionApproachData
      )
      return bindPromiseWithOnSuccess(solutionApproachPostPromise)
         .to(this.setSolutionApproachAPIStatus, response => {
            this.setSolutionApproachAPIResponse(response)
            onSuccessPostSolutionApproach()
         })
         .catch(error => {
            this.setSolutionApproachAPIError(error)
            onFailurePostSolutionApproach()
         })
   }

   @action.bound
   setCleanSolutionAPIStatus(cleanSolutionAPIStatus) {
      this.postCleanSolutionAPIStatus = cleanSolutionAPIStatus
   }

   @action.bound
   setCleanSolutionAPIError(cleanSolutionAPIError) {
      this.postCleanSolutionAPIError = getUserDisplayableErrorMessage(
         cleanSolutionAPIError
      )
   }

   @action.bound
   setCleanSolutionAPIResponse(cleanSolutionAPIResponse) {
      const { clean_solutions: cleanSolutions } = cleanSolutionAPIResponse
      if (cleanSolutions.length > 0) {
         this.postCleanSolutionAPIResponse = [
            ...cleanSolutions.map(cleanSolutionDetails => {
               const uniqueId = this.getRandomId()
               return new CleanSolutionModel({ uniqueId, cleanSolutionDetails })
            })
         ]
      }
   }

   @action.bound
   postCleanSolution(
      cleanSolutionData,
      onSuccessPostCleanSolution,
      onFailurePostCleanSolution
   ) {
      const cleanSolutionPromise = this.codingProblemsAPIService.postCleanSolutionAPI(
         this.codingProblemId,
         cleanSolutionData
      )
      return bindPromiseWithOnSuccess(cleanSolutionPromise)
         .to(this.setCleanSolutionAPIStatus, response => {
            this.setCleanSolutionAPIResponse(response)
            onSuccessPostCleanSolution()
         })
         .catch(error => {
            this.setCleanSolutionAPIError(error)
            onFailurePostCleanSolution()
         })
   }

   @action.bound
   setCleanSolutionDeleteAPIStatus(cleanSolutionDeleteAPIStatus) {
      this.deleteCleanSolutionAPIStatus = cleanSolutionDeleteAPIStatus
   }

   @action.bound
   setCleanSolutionDeleteAPIError(cleanSolutionDeleteAPIError) {
      this.deleteCleanSolutionAPIError = getUserDisplayableErrorMessage(
         cleanSolutionDeleteAPIError
      )
   }

   @action.bound
   deleteCleanSolution(
      cleanSolutionId,
      onSuccessDeleteCleanSolution,
      onFailureDeleteCleanSolution
   ) {
      const cleanSolutionPromise = this.codingProblemsAPIService.deleteCleanSolutionAPI(
         this.codingProblemId,
         cleanSolutionId
      )
      return bindPromiseWithOnSuccess(cleanSolutionPromise)
         .to(this.setCleanSolutionDeleteAPIStatus, () => {
            onSuccessDeleteCleanSolution()
         })
         .catch(error => {
            this.setCleanSolutionDeleteAPIError(error)
            onFailureDeleteCleanSolution()
         })
   }

   @action.bound
   setHintAPIStatus(hintAPIStatus) {
      this.postHintAPIStatus = hintAPIStatus
   }

   @action.bound
   setHintAPIError(hintAPIError) {
      this.postHintAPIError = getUserDisplayableErrorMessage(hintAPIError)
   }

   @action.bound
   isHintAlreadyPresent(hintDetails) {
      let isPresent = false
      if (this.postHintAPIResponses.length > 0) {
         this.postHintAPIResponses.forEach(hint => {
            if (hint.number === hintDetails.hint_number) {
               isPresent = true
            }
         })
      }
      return isPresent
   }

   @action.bound
   setHintAPIResponse(hintAPIResponse) {
      const { hint: hintDetails } = hintAPIResponse
      if (hintDetails) {
         if (!this.isHintAlreadyPresent(hintDetails)) {
            const uniqueId = this.getRandomId()
            this.postHintAPIResponses.push(
               new HintModel({ uniqueId, hintDetails })
            )
         }
      }
   }

   @action.bound
   postProblemHint(hintData, onSuccessPostHint, onFailurePostHint) {
      const hintPostPromise = this.codingProblemsAPIService.postHintAPI(
         this.codingProblemId,
         hintData
      )
      return bindPromiseWithOnSuccess(hintPostPromise)
         .to(this.setHintAPIStatus, response => {
            this.setHintAPIResponse(response)
            onSuccessPostHint()
         })
         .catch(error => {
            this.setHintAPIError(error)
            onFailurePostHint()
         })
   }

   @action.bound
   setHintDeleteAPIStatue(hintDeleteAPIStatus) {
      this.deleteHintAPIStatus = hintDeleteAPIStatus
   }

   @action.bound
   setHintDeleteAPIError(hintDeleteAPIError) {
      this.deleteHintAPIError = getUserDisplayableErrorMessage(
         hintDeleteAPIError
      )
   }

   @action.bound
   deleteProblemHint(hintId, onSuccessDeleteHint, onFailureDeleteHint) {
      const deleteHintPromise = this.codingProblemsAPIService.deleteHintAPI(
         this.codingProblemId,
         hintId
      )
      return bindPromiseWithOnSuccess(deleteHintPromise)
         .to(this.setHintDeleteAPIStatue, () => {
            onSuccessDeleteHint()
         })
         .catch(error => {
            this.setHintDeleteAPIError(error)
            onFailureDeleteHint()
         })
   }

   @action.bound
   setCodingProblemsAPIStatus(codingProblemsAPIStatus) {
      this.getCodingProblemsAPIStatus = codingProblemsAPIStatus
   }

   @action.bound
   setCodingProblemsAPIError(codingProblemsAPIError) {
      this.getCodingProblemsAPIError = getUserDisplayableErrorMessage(
         codingProblemsAPIError
      )
   }

   @action.bound
   setCodingProblemsAPIResponse(codingProblemsAPIResponse) {
      this.codingProblemsList = new Map()
      const {
         questions_list: codingProblems,
         total_questions: totalCodingProblems
      } = codingProblemsAPIResponse
      this.totalCodingProblems = totalCodingProblems
      codingProblems.forEach(codingProblem => {
         const randomId = this.getRandomId()
         this.codingProblemsList.set(
            randomId,
            new CodingProblemItemModel(codingProblem, randomId)
         )
      })
   }

   @action.bound
   incrementPageNumber(codingProblemsLimit) {
      this.currentCodingProblemsPage += 1
      this.updateCodingProblemsOffsetValue(
         this.currentCodingProblemsPage,
         codingProblemsLimit
      )
   }

   @action.bound
   decrementPageNumber(codingProblemsLimit) {
      this.currentCodingProblemsPage -= 1
      this.updateCodingProblemsOffsetValue(
         this.currentCodingProblemsPage,
         codingProblemsLimit
      )
   }

   @action.bound
   updateCodingProblemsOffsetValue(pageNumber, codingProblemsLimit) {
      this.currentCodingProblemsPage = pageNumber
      this.codingProblemsOffset =
         this.currentCodingProblemsPage * codingProblemsLimit -
         codingProblemsLimit +
         1
      this.getCodingProblems()
   }

   @action.bound
   getCodingProblems() {
      const codingProblemsPromise = this.codingProblemsAPIService.getCodingProblemsAPI(
         this.codingProblemsOffset
      )
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
      this.getCodingProblemDetailsAPIError = getUserDisplayableErrorMessage(
         codingProblemDetailsAPIError
      )
   }

   @action.bound
   setCodingProblemDetailsAPIResponse(codingProblemDetailsAPIResponse) {
      this.codingProblemId = codingProblemDetailsAPIResponse.question_id
      this.codingProblemDetails = new CodingProblemDetailsModel(
         codingProblemDetailsAPIResponse
      )
   }

   @action.bound
   getCodingProblemDetails(codingProblemId) {
      const codingProblemDetailsPromise = this.codingProblemsAPIService.getCodingProblemDetailsAPI(
         codingProblemId
      )
      return bindPromiseWithOnSuccess(codingProblemDetailsPromise)
         .to(
            this.setCodingProblemDetailsAPIStatus,
            this.setCodingProblemDetailsAPIResponse
         )
         .catch(this.setCodingProblemDetailsAPIError)
   }
}

export { CodingProblemsStore }
