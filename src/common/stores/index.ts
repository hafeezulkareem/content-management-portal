import { CodingProblemsAPI } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsAPI'
import { CodingProblemsStore } from '../../CodingProblems/stores/CodingProblemsStore'
import { CodingProblemsFixture } from '../../CodingProblems/services/CodingProblemsService/CodingProblemsFixture'

const codingProblemsAPI = new CodingProblemsAPI()
const codingProblemsFixture = new CodingProblemsFixture()
const codingProblemsStore = new CodingProblemsStore(codingProblemsFixture)

export default {
   codingProblemsStore
}
