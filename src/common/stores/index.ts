import { CodingProblemsAPI } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../CodingProblems/stores/CodingProblemsStore'
import { CodingProblemsFixture } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsFixture'
import { AuthAPI } from '../../Authentication/services/AuthServices/AuthAPI'
import { AuthFixture } from '../../Authentication/services/AuthServices/AuthFixture'
import { AuthStore } from '../../Authentication/stores/AuthStore'

const authAPI = new AuthAPI()
const authFixture = new AuthFixture()
const authStore = new AuthStore(authAPI)

const codingProblemsAPI = new CodingProblemsAPI()
const codingProblemsFixture = new CodingProblemsFixture()
const codingProblemsStore = new CodingProblemsStore(codingProblemsAPI)

export default {
   authStore,
   codingProblemsStore
}
