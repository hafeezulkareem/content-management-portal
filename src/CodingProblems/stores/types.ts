interface StatementObject {
   short_text: string
   problem_description: {
      content: string
      content_type: string
   }
}

export interface PostStatementRequest extends StatementObject {
   question_id: number | null
}

export interface PostStatementResponse extends StatementObject {
   question_id: number
}

interface CodeEditorObject {
   language: string
   solution_content: string
   file_name: string
}

export interface PostRoughSolutionRequest extends CodeEditorObject {
   rough_solution_id: number | null
}

interface PostRoughSolutionResponseObject extends CodeEditorObject {
   rough_solution_id: number
}

export interface PostRoughSolutionResponse {
   question_id: number
   rough_solutions: Array<PostRoughSolutionResponseObject>
}

export interface PostPrefilledCodeRequest extends CodeEditorObject {
   prefilled_code_id: number | null
}

interface PostPrefilledCodeResponseObject extends CodeEditorObject {
   prefilled_code_id: number
}

export interface PostPrefilledCodeResponse {
   question_id: number
   prefilled_codes: Array<PostPrefilledCodeResponseObject>
}

export interface PostCleanSolutionRequest extends CodeEditorObject {
   clean_solution_id: number | null
}

interface PostCleanSolutionResponseObject extends CodeEditorObject {
   clean_solution_id: number
}

export interface PostCleanSolutionResponse {
   question_id: number
   clean_solutions: Array<PostCleanSolutionResponseObject>
}

interface TestCaseObject {
   test_case_number: number
   input: string
   output: string
   score: number
   is_hidden: boolean
}

export interface PostTestCaseRequest extends TestCaseObject {
   test_case_id: number | null
}

interface PostTestCaseResponseObject extends TestCaseObject {
   test_case_id: number
}

export interface PostTestCaseResponse {
   question_id: number
   test_case: PostTestCaseResponseObject
}

interface SolutionApproachObject {
   title: string
   description: {
      content_type: string
      content: string
   }
   complexity_analysis: {
      content_type: string
      content: string
   }
}

export interface PostSolutionApproachRequest extends SolutionApproachObject {
   solution_approach_id: number | null
}

export interface PostSolutionApproachResponse extends SolutionApproachObject {
   solution_approach_id: number
}

interface HintObject {
   hint_number: number
   title: string
   description: {
      content: string
      content_type: string
   }
}

export interface PostHintRequest extends HintObject {
   hint_id: number | null
}

interface PostHintResponseObject extends HintObject {
   hint_id: number
}

export interface PostHintResponse {
   question_id: number
   hint: PostHintResponseObject
}

interface CodingProblemObject {
   question_id: number
   statement: string
   rough_solution_status: boolean
   test_cases_status: boolean
   prefilled_code_status: boolean
   solution_approach_status: boolean
   clean_solution_status: boolean
}

export interface GetCodingProblemsResponse {
   total_questions: number
   offset: number
   limit: number
   questions_list: Array<CodingProblemObject>
}

export interface GetCodingProblemDetailsResponse {
   question_id: number
   statement: StatementObject
   rough_solutions: Array<PostRoughSolutionResponseObject>
   test_cases: Array<PostTestCaseResponseObject>
   prefilled_codes: Array<PostPrefilledCodeResponseObject>
   solution_approach: PostSolutionApproachResponse
   clean_solutions: Array<PostCleanSolutionResponseObject>
   hints: Array<PostHintResponseObject>
}
