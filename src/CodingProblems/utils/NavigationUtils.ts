import { History } from 'history'

import {
   SIGN_IN_PATH,
   CODING_PROBLEMS_PATH
} from '../../Common/constants/RouteConstants'

import { CODING_PROBLEM_CREATE_PATH } from '../constants/RouteConstants'

export const goToSignInPage = (history: History) => {
   history.push(SIGN_IN_PATH)
}

export const goToCodingProblemsHome = (history: History) => {
   history.push(CODING_PROBLEMS_PATH)
}

export const goToCodingProblemCreatingFlow = (history: History) => {
   history.push(CODING_PROBLEM_CREATE_PATH)
}

export const goToCodingProblemsDetailsPage = (
   history: History,
   codingProblemId: number
) => {
   history.push(`${CODING_PROBLEMS_PATH}${codingProblemId}`)
}
