import postUserSignInResponse from '../../fixtures/postUserSignInResponse.json'

class AuthFixture {
   postSignInAPI(userDetails) {
      return new Promise((resolve, reject) => resolve(postUserSignInResponse))
   }
}

export { AuthFixture }
