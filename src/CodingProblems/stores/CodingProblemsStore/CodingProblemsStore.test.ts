import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import getCodingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import getCodingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'
import postStatementResponse from '../../fixtures/postProblemStatementResponse.json'
import postRoughSolutionResponse from '../../fixtures/postProblemRoughSolutionResponse.json'
import postTestCaseResponse from '../../fixtures/postProblemTestCaseResponse.json'
import postPrefilledCodeResponse from '../../fixtures/postProblemPrefilledCodeResponse.json'
import postCleanSolutionResponse from '../../fixtures/postProblemCleanSolutionResponse.json'
import postSolutionSolutionApproachResponse from '../../fixtures/postProblemSolutionApproachResponse.json'
import postHintResponse from '../../fixtures/postProblemHintResponse.json'

import { CodingProblemsStore } from './CodingProblemsStore'

let codingProblemsAPI, codingProblemsStore

const statementData = {
   question_id: null,
   short_text: 'short text',
   problem_description: {
      content: 'content',
      content_type: 'HTML'
   }
}

const roughSolutionsData = [
   {
      language: 'PYTHON',
      solution_content: 'import python',
      file_name: 'sample.py',
      rough_solution_id: 0
   },
   {
      language: 'JAVASCRIPT',
      solution_content: "console.log('Hello, World!')",
      file_name: 'sample.js',
      rough_solution_id: 1
   }
]

const testCaseData = {
   test_case_id: 0,
   test_case_number: 1,
   input: 'print(1)',
   output: '1',
   score: 64,
   is_hidden: false
}

describe('CodingProblemsStore tests', () => {
   beforeEach(() => {
      codingProblemsAPI = new CodingProblemsAPI()
      codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)
   })

   it('should test PostStatementAPI initial state', () => {
      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postStatementAPIError).toBe(null)
   })

   it('should test PostStatementAPI posting state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostStatementAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postStatementAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostStatementAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(postStatementResponse)
      })
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_SUCCESS)
      expect(codingProblemsStore.codingProblemId).toBe(10)
   })

   it('should test PostRoughSolutionAPI initial state', () => {
      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postRoughSolutionAPIError).toBe(null)
   })

   it('should test PostRoughSolutionAPI posting state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostRoughSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postRoughSolutionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostRoughSolutionAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(postRoughSolutionResponse)
      })
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test DeleteRoughSolution initial state', () => {
      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.deleteRoughSolutionAPIError).toBe(null)
   })

   it('should test DeleteRoughSolution deleting state', () => {
      const mockDeletingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
         return mockDeletingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemRoughSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test DeleteRoughSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemRoughSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deleteRoughSolutionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test DeleteRoughSolution success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemRoughSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PostTestCaseAPI initial state', () => {
      expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postTestCaseAPIError).toBe(null)
   })

   it('should test PostTestCaseAPI posting state', () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostTestCaseAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postTestCaseAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostTestCaseAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postTestCaseResponse)
      })
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PostSolutionApproachAPI initial state', () => {
      expect(codingProblemsStore.postSolutionApproachAPIStatus).toBe(
         API_INITIAL
      )
      expect(codingProblemsStore.postSolutionApproachAPIError).toBe(null)
   })

   it('should test PostSolutionApproach posting state', () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postSolutionApproachAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemSolutionApproach(
         testCaseData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postSolutionApproachAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test PostSolutionApproachAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postSolutionApproachAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemSolutionApproach(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postSolutionApproachAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postSolutionApproachAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostSolutionApproachAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postSolutionSolutionApproachResponse)
      })
      codingProblemsAPI.postSolutionApproachAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemSolutionApproach(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postSolutionApproachAPIStatus).toBe(
         API_SUCCESS
      )
   })

   it('should test DeleteTestCaseAPI initial state', () => {
      expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.deleteTestCaseAPIError).toBe(null)
   })

   it('should test DeleteTestCaseAPI deleting state', () => {
      const mockDeletingPromise = new Promise(() => {})
      codingProblemsAPI.deleteTestCaseAPI = jest.fn(() => {
         return mockDeletingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_FETCHING)
   })

   it('should test DeleteTestCaseAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.deleteTestCaseAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deleteTestCaseAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test DeleteTestCaseAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deleteTestCaseAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PostPrefilledCodeAPI initial state', () => {
      expect(codingProblemsStore.postPrefilledCodeAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postPrefilledCodeAPIError).toBe(null)
   })

   it('should test PostPrefilledCodeAPI posting state', () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postPrefilledCodeAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemPrefilledCode(
         testCaseData,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postPrefilledCodeAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostPrefilledCodeAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postPrefilledCodeAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemPrefilledCode(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postPrefilledCodeAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postPrefilledCodeAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostPrefilledCodeAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postPrefilledCodeResponse)
      })
      codingProblemsAPI.postPrefilledCodeAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemPrefilledCode(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postPrefilledCodeAPIStatus).toBe(API_SUCCESS)
   })

   it('should test DeletePrefilledCodeAPI initial state', () => {
      expect(codingProblemsStore.deletePrefilledCodeAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.deletePrefilledCodeAPIError).toBe(null)
   })

   it('should test DeletePrefilledCodeAPI deleting state', () => {
      const mockDeletingPromise = new Promise(() => {})
      codingProblemsAPI.deletePrefilledCodeAPI = jest.fn(() => {
         return mockDeletingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemPrefilledCode(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deletePrefilledCodeAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test DeletePrefilledCodeAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.deletePrefilledCodeAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemPrefilledCode(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deletePrefilledCodeAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deletePrefilledCodeAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test DeletePrefilledCodeAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deletePrefilledCodeAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemPrefilledCode(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deletePrefilledCodeAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PostCleanSolutionAPI initial state', () => {
      expect(codingProblemsStore.postCleanSolutionAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postCleanSolutionAPIError).toBe(null)
   })

   it('should test PostCleanSolutionAPI posting state', () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postCleanSolutionAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postCleanSolution(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postCleanSolutionAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostCleanSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postCleanSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postCleanSolution(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postCleanSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postCleanSolutionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostCleanSolutionAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postCleanSolutionResponse)
      })
      codingProblemsAPI.postCleanSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postCleanSolution(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postCleanSolutionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test DeleteCleanSolutionAPI initial state', () => {
      expect(codingProblemsStore.deleteCleanSolutionAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.deleteCleanSolutionAPIError).toBe(null)
   })

   it('should test DeleteHintAPI deleting state', () => {
      const mockDeletingPromise = new Promise(() => {})
      codingProblemsAPI.deleteCleanSolutionAPI = jest.fn(() => {
         return mockDeletingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.deleteCleanSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteCleanSolutionAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test DeleteCleanSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.deleteCleanSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteCleanSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteCleanSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deleteCleanSolutionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test DeleteCleanSolutionAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deleteCleanSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteCleanSolution(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteCleanSolutionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PostHintAPI initial state', () => {
      expect(codingProblemsStore.postHintAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.postHintAPIError).toBe(null)
   })

   it('should test PostHintAPI posting state', () => {
      const mockLoadingPromise = new Promise(() => {})
      codingProblemsAPI.postHintAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.postProblemHint(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postHintAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostHintAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.postHintAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemHint(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postHintAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postHintAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test PostHintAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postHintResponse)
      })
      codingProblemsAPI.postHintAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.postProblemHint(
         {},
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.postHintAPIStatus).toBe(API_SUCCESS)
   })

   it('should test DeleteHinAPI initial state', () => {
      expect(codingProblemsStore.deleteHintAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.deleteHintAPIError).toBe(null)
   })

   it('should test DeleteHintAPI deleting state', () => {
      const mockDeletingPromise = new Promise(() => {})
      codingProblemsAPI.deleteHintAPI = jest.fn(() => {
         return mockDeletingPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemHint(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteHintAPIStatus).toBe(API_FETCHING)
   })

   it('should test DeleteHintAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.deleteHintAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemHint(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteHintAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deleteHintAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test DeleteHintAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deleteHintAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemHint(
         0,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(codingProblemsStore.deleteHintAPIStatus).toBe(API_SUCCESS)
   })

   it('should test GetCodingProblemsAPI initial state', () => {
      expect(codingProblemsStore.getCodingProblemsAPIStatus).toBe(API_INITIAL)
      expect(codingProblemsStore.getCodingProblemsAPIError).toBe(null)
   })

   it('should test GetCodingProblemsAPI posting state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      codingProblemsStore.getCodingProblems()

      expect(codingProblemsStore.getCodingProblemsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetCodingProblemsAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockFailurePromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(codingProblemsStore.getCodingProblemsAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.getCodingProblemsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetCodingProblemsAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getCodingProblemsResponse)
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(codingProblemsStore.getCodingProblemsAPIStatus).toBe(API_SUCCESS)
   })

   it('should test GetCodingProblemDetailsAPI initial state', () => {
      expect(codingProblemsStore.getCodingProblemDetailsAPIStatus).toBe(
         API_INITIAL
      )
      expect(codingProblemsStore.getCodingProblemDetailsAPIError).toBe(null)
   })

   it('should test GetCodingProblemDetailsAPI posting state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockLoadingPromise
      })

      codingProblemsStore.getCodingProblemDetails()

      expect(codingProblemsStore.getCodingProblemDetailsAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test GetCodingProblemDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockFailurePromise
      })

      await codingProblemsStore.getCodingProblemDetails()

      expect(codingProblemsStore.getCodingProblemDetailsAPIStatus).toBe(
         API_FAILED
      )
      expect(codingProblemsStore.getCodingProblemDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetCodingProblemDetailsAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getCodingProblemDetailsResponse)
      })
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      await codingProblemsStore.getCodingProblemDetails()

      expect(codingProblemsStore.getCodingProblemDetailsAPIStatus).toBe(
         API_SUCCESS
      )
   })
})
