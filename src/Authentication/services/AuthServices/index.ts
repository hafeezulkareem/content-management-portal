import { SignInRequestObject, SignInResponse } from '../../stores/types'

export interface AuthService {
   postSignInAPI: (
      requestObject: SignInRequestObject
   ) => Promise<SignInResponse>
}
