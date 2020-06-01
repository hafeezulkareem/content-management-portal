import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { CodingProblemsAPI } from '../../services/CodingProblemsService/CodingProblemsAPI'
import getCodingProblemsResponse from '../../fixtures/getCodingProblemsResponse.json'
import getCodingProblemDetailsResponse from '../../fixtures/getCodingProblemDetailsResponse.json'
import postTestCaseResponse from '../../fixtures/postProblemTestCaseResponse.json'

import { CodingProblemsStore } from './CodingProblemsStore'
import { waitFor } from '@testing-library/react'

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
      rough_solution_id: 0
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
      const mocFailureFunction = jest.fn()

      codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostStatementAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(new Error('Something went wrong!'))
      })
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postStatementAPIError).toBe(
         'Something went wrong!'
      )
   })

   it('should test PostStatementAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve({ question_id: 0 })
      })
      codingProblemsAPI.postProblemStatementAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemStatement(
         statementData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postStatementAPIStatus).toBe(API_SUCCESS)
      expect(codingProblemsStore.codingProblemId).toBe(0)
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
      const mocFailureFunction = jest.fn()

      codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostRoughSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(new Error('Something went wrong!'))
      })
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postRoughSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.postRoughSolutionAPIError).toBe(
         'Something went wrong!'
      )
   })

   it('should test PostRoughSolutionAPI success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(roughSolutionsData)
      })
      codingProblemsAPI.postProblemRoughSolutionAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemRoughSolution(
         roughSolutionsData,
         mockSuccessFunction,
         mocFailureFunction
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
      const mocFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemRoughSolution(
         0,
         0,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test DeleteRoughSolutionAPI failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(new Error('Error while deleting'))
      })
      codingProblemsAPI.deleteRoughSolutionAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemRoughSolution(
         0,
         0,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.deleteRoughSolutionAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.deleteRoughSolutionAPIError).toBe(
         'Error while deleting'
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
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemRoughSolution(
         0,
         0,
         mockSuccessFunction,
         mocFailureFunction
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
      const mocFailureFunction = jest.fn()

      codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_FETCHING)
   })

   it('should test PostTestCaseAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Something went wrong!'))
      })
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mocFailureFunction
      )

      await waitFor(() => {
         expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_FAILED)
         expect(codingProblemsStore.postTestCaseAPIError).toBe(
            'Something went wrong!'
         )
      })
   })

   it('should test PostTestCaseAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(postTestCaseResponse)
      })
      codingProblemsAPI.postProblemTestCaseAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.postProblemTestCase(
         testCaseData,
         mockSuccessFunction,
         mocFailureFunction
      )

      await waitFor(() => {
         expect(codingProblemsStore.postTestCaseAPIStatus).toBe(API_SUCCESS)
      })
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
      const mocFailureFunction = jest.fn()

      codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mocFailureFunction
      )

      expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_FETCHING)
   })

   it('should test DeleteTestCaseAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Error while deleting'))
      })
      codingProblemsAPI.deleteTestCaseAPI = jest.fn(() => {
         return mockFailurePromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mocFailureFunction
      )

      await (() => {
         expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_FAILED)
         expect(codingProblemsStore.deleteTestCaseAPIError).toBe(
            'Error while deleting'
         )
      })
   })

   it('should test DeleteTestCaseAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Deleted successfully')
      })
      codingProblemsAPI.deleteTestCaseAPI = jest.fn(() => {
         return mockSuccessPromise
      })

      const mockSuccessFunction = jest.fn()
      const mocFailureFunction = jest.fn()

      await codingProblemsStore.deleteProblemTestCase(
         0,
         mockSuccessFunction,
         mocFailureFunction
      )

      await (() => {
         expect(codingProblemsStore.deleteTestCaseAPIStatus).toBe(API_SUCCESS)
      })
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
         reject(new Error('Something went wrong!'))
      })
      codingProblemsAPI.getCodingProblemsAPI = jest.fn(() => {
         return mockFailurePromise
      })

      await codingProblemsStore.getCodingProblems()

      expect(codingProblemsStore.getCodingProblemsAPIStatus).toBe(API_FAILED)
      expect(codingProblemsStore.getCodingProblemsAPIError).toBe(
         'Something went wrong!'
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
         reject(new Error('Something went wrong!'))
      })
      codingProblemsAPI.getCodingProblemDetailsAPI = jest.fn(() => {
         return mockFailurePromise
      })

      await codingProblemsStore.getCodingProblemDetails()

      expect(codingProblemsStore.getCodingProblemDetailsAPIStatus).toBe(
         API_FAILED
      )
      expect(codingProblemsStore.getCodingProblemDetailsAPIError).toBe(
         'Something went wrong!'
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
