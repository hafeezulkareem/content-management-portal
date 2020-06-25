import postUserSignInResponse from '../../fixtures/postUserSignInResponse.json'

import { resolveWithTimeOut } from '../../../Common/utils/TestUtils'

import { AuthService } from '.'

class AuthFixture implements AuthService {
   postSignInAPI(userDetails) {
      return resolveWithTimeOut(postUserSignInResponse)
   }
}

export { AuthFixture }
