import {
   PostStatementResponse,
   PostStatementRequest,
   PostRoughSolutionRequest,
   PostRoughSolutionResponse,
   PostTestCaseRequest,
   PostTestCaseResponse,
   PostPrefilledCodeRequest,
   PostPrefilledCodeResponse,
   PostSolutionApproachRequest,
   PostSolutionApproachResponse,
   PostHintRequest,
   PostHintResponse,
   PostCleanSolutionRequest,
   PostCleanSolutionResponse,
   GetCodingProblemsResponse,
   GetCodingProblemDetailsResponse
} from '../../stores/types'

export interface CodingProblemsService {
   postProblemStatementAPI: (
      data: PostStatementRequest
   ) => Promise<PostStatementResponse>

   postProblemRoughSolutionAPI: (
      id: number | null,
      data: PostRoughSolutionRequest
   ) => Promise<PostRoughSolutionResponse>

   deleteRoughSolutionAPI: (
      id: number | null,
      roughSolutionId: number
   ) => Promise<{}>

   postProblemTestCaseAPI: (
      id: number | null,
      data: PostTestCaseRequest
   ) => Promise<PostTestCaseResponse>

   deleteTestCaseAPI: (id: number | null, testCaseId: number) => Promise<{}>

   postPrefilledCodeAPI: (
      id: number | null,
      data: PostPrefilledCodeRequest
   ) => Promise<PostPrefilledCodeResponse>

   deletePrefilledCodeAPI: (
      id: number | null,
      prefilledCodeId: number
   ) => Promise<{}>

   postSolutionApproachAPI: (
      id: number | null,
      data: PostSolutionApproachRequest
   ) => Promise<PostSolutionApproachResponse>

   postHintAPI: (
      id: number | null,
      data: PostHintRequest
   ) => Promise<PostHintResponse>

   deleteHintAPI: (id: number | null, hintId: number) => Promise<{}>

   postCleanSolutionAPI: (
      id: number | null,
      data: PostCleanSolutionRequest
   ) => Promise<PostCleanSolutionResponse>

   deleteCleanSolutionAPI: (
      id: number | null,
      cleanSolutionId: number
   ) => Promise<{}>

   getCodingProblemsAPI: (offset: number) => Promise<GetCodingProblemsResponse>

   getCodingProblemDetailsAPI: (
      id: number | null
   ) => Promise<GetCodingProblemDetailsResponse>
}
