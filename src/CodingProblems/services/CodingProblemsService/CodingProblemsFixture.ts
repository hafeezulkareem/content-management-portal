import problemStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import problemRoughSolutionResponse from '../../fixtures/postProblemRoughSolutionResponse.json'
import problemTestCaseResponse from '../../fixtures/postProblemTestCaseResponse.json'
import problemPrefilledCodeResponse from '../../fixtures/postProblemPrefilledCodeResponse.json'
import problemSolutionApproachResponse from '../../fixtures/postProblemSolutionApproachResponse.json'
import problemCleanSolutionResponse from '../../fixtures/postProblemCleanSolutionResponse.json'
import problemHintResponse from '../../fixtures/postProblemHintResponse.json'
import codingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import codingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'

class CodingProblemsFixture {
   postProblemStatementAPI() {
      return new Promise(resolve => resolve(problemStatementResponse))
   }

   postProblemRoughSolutionAPI(codingProblemId, roughSolutionData) {
      console.log('Posting Rough Solution CodingProblemId:- ', codingProblemId)
      console.log('Posting Rough Solution Data:- ', roughSolutionData)
      return new Promise(resolve => resolve(problemRoughSolutionResponse))
   }

   deleteRoughSolutionAPI(codingProblemId, roughSolutionId) {
      console.log('Deleting Rough Solution CodingProblemId:- ', codingProblemId)
      console.log('Deleting Rough Solution Id:- ', roughSolutionId)
      return new Promise(resolve => {
         resolve('Rough solution is deleted')
      })
   }

   postProblemTestCaseAPI(codingProblemId, testCaseData) {
      console.log(
         'Posting TestCase Solution CodingProblemId:- ',
         codingProblemId
      )
      console.log('Posting TestCase Solution Data:- ', testCaseData)
      return new Promise(resolve => {
         resolve(problemTestCaseResponse)
      })
   }

   deleteTestCaseAPI(codingProblemId, testCaseId) {
      console.log('Deleting TestCase CodingProblemId:- ', codingProblemId)
      console.log('Deleting TestCase Id:- ', testCaseId)
      return new Promise(resolve => {
         resolve('Test case is deleted')
      })
   }

   postPrefilledCodeAPI(codingProblemId, prefilledCodeData) {
      console.log('Posting Prefilled Code CodingProblemId:- ', codingProblemId)
      console.log('Posting Prefilled Code Data:- ', prefilledCodeData)
      return new Promise(resolve => {
         resolve(problemPrefilledCodeResponse)
      })
   }

   deletePrefilledCodeAPI(codingProblemId, prefilledCodeId) {
      console.log('Deleting Prefilled Code CodingProblemId:- ', codingProblemId)
      console.log('Deleting Prefilled Code Id:- ', prefilledCodeId)
      return new Promise(resolve => {
         resolve('Prefilled code is deleted')
      })
   }

   postSolutionApproachAPI(codingProblemId, solutionApproachData) {
      console.log(
         'Posting Solution Approach CodingProblemId:- ',
         codingProblemId
      )
      console.log('Posting Solution Approach Data:- ', solutionApproachData)
      return new Promise(resolve => {
         resolve(problemSolutionApproachResponse)
      })
   }

   postHintAPI(codingProblemId, hintData) {
      console.log('Posting Hint CodingProblemId:- ', codingProblemId)
      console.log('Posting Hint Data:- ', hintData)
      return new Promise(resolve => {
         resolve(problemHintResponse)
      })
   }

   deleteHintAPI(codingProblemId, hintId) {
      console.log('Deleting Hint CodingProblemId:- ', codingProblemId)
      console.log('Deleting Hint Id:- ', hintId)
      return new Promise(resolve => {
         resolve('Deleted successfully')
      })
   }

   postCleanSolutionAPI(codingProblemId, cleanSolutionData) {
      console.log('Posting Clean Solution CodingProblemId:- ', codingProblemId)
      console.log('Posting Clean Solution Data:- ', cleanSolutionData)
      return new Promise(resolve => resolve(problemCleanSolutionResponse))
   }

   deleteCleanSolutionAPI(codingProblemId, cleanSolutionId) {
      console.log('Deleting Clean Solution CodingProblemId:- ', codingProblemId)
      console.log('Deleting Clean Solution Id:- ', cleanSolutionId)
      return new Promise(resolve =>
         resolve('Clean solution deleted successfully')
      )
   }

   getCodingProblemsAPI() {
      return new Promise(resolve =>
         setTimeout(() => {
            resolve(codingProblemsResponse)
         }, 1000)
      )
   }

   getCodingProblemDetailsAPI() {
      return new Promise(resolve =>
         setTimeout(() => {
            resolve(codingProblemDetailsResponse)
         }, 1000)
      )
   }
}

export { CodingProblemsFixture }
