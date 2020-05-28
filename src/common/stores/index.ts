import { CodingProblemsAPI } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../CodingProblems/stores/CodingProblemsStore'
import { CodingProblemsFixture } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsFixture'
import { AuthAPI } from '../../Authentication/services/AuthSerives/AuthAPI'
import { AuthFixture } from '../../Authentication/services/AuthSerives/AuthFixture'
import { AuthStore } from '../../Authentication/stores/AuthStore'

const authAPI = new AuthAPI()
const authFixture = new AuthFixture()
const authStore = new AuthStore(authFixture)

const codingProblemsAPI = new CodingProblemsAPI()
const codingProblemsFixture = new CodingProblemsFixture()
const codingProblemsStore = new CodingProblemsStore(codingProblemsFixture)

export default {
   authStore,
   codingProblemsStore
}
